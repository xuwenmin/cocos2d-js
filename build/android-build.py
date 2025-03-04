#!/usr/bin/python
# android-build.py
# Build android

import sys
import os, os.path
import shutil
from optparse import OptionParser

JS_SAMPLES = ['js-tests', 'js-moonwarriors']
def get_num_of_cpu():
        ''' The build process can be accelerated by running multiple concurrent job processes using the -j-option.
        '''
        try:
                platform = sys.platform
                if platform == 'win32':
                        if 'NUMBER_OF_PROCESSORS' in os.environ:
                                return int(os.environ['NUMBER_OF_PROCESSORS'])
                        else:
                                return 1
                else:
                        from numpy.distutils import cpuinfo
                        return cpuinfo.cpu._getNCPUs()
        except Exception:
                print "Can't know cpuinfo, use default 1 cpu"
                return 1

def check_environment_variables():
    ''' Checking the environment NDK_ROOT, which will be used for building
    '''

    try:
        NDK_ROOT = os.environ['NDK_ROOT']
    except Exception:
        print "NDK_ROOT not defined. Please define NDK_ROOT in your environment"
        sys.exit(1)

    return NDK_ROOT

def check_environment_variables_sdk():
    ''' Checking the environment ANDROID_SDK_ROOT, which will be used for building
    '''

    try:
        SDK_ROOT = os.environ['ANDROID_SDK_ROOT']
    except Exception:
        print "ANDROID_SDK_ROOT not defined. Please define ANDROID_SDK_ROOT in your environment"
        sys.exit(1)

    return SDK_ROOT

def select_toolchain_version():
    '''Because ndk-r8e uses gcc4.6 as default. gcc4.6 doesn't support c++11. So we should select gcc4.7 when
    using ndk-r8e. But gcc4.7 is removed in ndk-r9, so we should determine whether gcc4.7 exist.
    Conclution:
    ndk-r8e  -> use gcc4.7
    ndk-r9   -> use gcc4.8
    '''

    ndk_root = check_environment_variables()
    if os.path.isdir(os.path.join(ndk_root,"toolchains/arm-linux-androideabi-4.8")):
        os.environ['NDK_TOOLCHAIN_VERSION'] = '4.8'
        print "The Selected NDK toolchain version was 4.8 !"
    elif os.path.isdir(os.path.join(ndk_root,"toolchains/arm-linux-androideabi-4.7")):
        os.environ['NDK_TOOLCHAIN_VERSION'] = '4.7'
        print "The Selected NDK toolchain version was 4.7 !"
    else:
        print "Couldn't find the gcc toolchain."
        exit(1)

def do_build(cocos_root, ndk_root, app_android_root, ndk_build_param,sdk_root,android_platform,build_mode):

    ndk_path = os.path.join(ndk_root, "ndk-build")

    # windows should use ";" to seperate module paths
    platform = sys.platform
    if platform == 'win32':
        ndk_module_path = 'NDK_MODULE_PATH=%s/..;%s;%s/external;%s/cocos' % (cocos_root, cocos_root, cocos_root, cocos_root)
    else:
        ndk_module_path = 'NDK_MODULE_PATH=%s/..:%s:%s/external:%s/cocos' % (cocos_root, cocos_root, cocos_root, cocos_root)

    num_of_cpu = get_num_of_cpu()
    if ndk_build_param == None:
        command = '%s -j%d -C %s %s' % (ndk_path, num_of_cpu, app_android_root, ndk_module_path)
    else:
        command = '%s -j%d -C %s %s %s' % (ndk_path, num_of_cpu, app_android_root, ndk_build_param, ndk_module_path)
    print command
    if os.system(command) != 0:
        raise Exception("Build dynamic library for project [ " + app_android_root + " ] fails!")
    elif android_platform is not None:
          sdk_tool_path = os.path.join(sdk_root, "tools/android")
          cocoslib_path = os.path.join(cocos_root, "cocos/platform/android/java")
          command = '%s update lib-project -t %s -p %s' % (sdk_tool_path,android_platform,cocoslib_path)
          if os.system(command) != 0:
                  raise Exception("update cocos lib-project [ " + cocoslib_path + " ] fails!")
          command = '%s update project -t %s -p %s -s' % (sdk_tool_path,android_platform,app_android_root)
          if os.system(command) != 0:
                  raise Exception("update project [ " + app_android_root + " ] fails!")
          buildfile_path = os.path.join(app_android_root, "build.xml")
          command = 'ant clean %s -f %s -Dsdk.dir=%s' % (build_mode,buildfile_path,sdk_root)
          os.system(command)

def copy_files(src, dst):

    for item in os.listdir(src):
        path = os.path.join(src, item)
        # Android can not package the file that ends with ".gz"
        if not item.startswith('.') and not item.endswith('.gz') and os.path.isfile(path):
            shutil.copy(path, dst)
        if os.path.isdir(path):
            new_dst = os.path.join(dst, item)
            os.mkdir(new_dst)
            copy_files(path, new_dst)

def copy_resources(target, app_android_root):

    # remove app_android_root/assets if it exists
    assets_dir = os.path.join(app_android_root, "assets")
    if os.path.isdir(assets_dir):
        shutil.rmtree(assets_dir)

    # copy resources
    os.mkdir(assets_dir)

    assets_res_dir = assets_dir + "/res";
    assets_scripts_dir = assets_dir + "/src";
    assets_jsb_dir = assets_dir + "/script";
    os.mkdir(assets_res_dir);
    os.mkdir(assets_scripts_dir);
    os.mkdir(assets_jsb_dir);

    if target in JS_SAMPLES:
        shutil.copy(os.path.join(app_android_root, "../../main.js"), assets_dir)
        shutil.copy(os.path.join(app_android_root, "../../project.json"), assets_dir)

        resources_dir = os.path.join(app_android_root, "../../res")
        copy_files(resources_dir, assets_res_dir)

        resources_dir = os.path.join(app_android_root, "../../src")
        copy_files(resources_dir, assets_scripts_dir)

        # js project should copy js script
        resources_dir = os.path.join(app_android_root, "../../../../frameworks/js-bindings/bindings/script")
        copy_files(resources_dir, assets_jsb_dir)

def build(targets,ndk_build_param,android_platform,build_mode):

    ndk_root = check_environment_variables()
    sdk_root = None
    select_toolchain_version()

    project_root = os.path.join(os.path.dirname(os.path.realpath(__file__)), "..")
    cocos_root = os.path.join(project_root, "frameworks/js-bindings/cocos2d-x")

    if android_platform is not None:
        sdk_root = check_environment_variables_sdk()
        if android_platform.isdigit():
            android_platform = 'android-'+android_platform
        else:
            print 'please use vaild android platform'
            exit(1)

    if build_mode is None:
        build_mode = 'debug'
    elif build_mode != 'release':
        build_mode = 'debug'

    app_android_root = ''

    target_proj_path_map = {
        "js-tests"       : "samples/js-tests/project/proj.android",
        "js-moonwarriors": "samples/js-moonwarriors/project/proj.android",
    }

    if "all" in targets:
        targets = JS_SAMPLES

    for target in targets:
        if target in target_proj_path_map:
            app_android_root = os.path.join(project_root, target_proj_path_map[target])
        else:
            print 'unknown target: %s' % target
            continue

        copy_resources(target, app_android_root)
        do_build(cocos_root, ndk_root, app_android_root,ndk_build_param,sdk_root,android_platform,build_mode)

# -------------- main --------------
if __name__ == '__main__':

    #parse the params
    usage = """
    This script is mainy used for building tests built-in with cocos2d-x.

    Usage: %prog [options] [js-tests|js-moonwarriors|all]

    You can combine these targets like this:

    python android-build.py -p 10 js-tests js-moonwarriors

    or build all valid targets as follows:

    python android-build.py -p 10 all

    Note: You should install ant to generate apk while building the andriod tests. But it is optional. You can generate apk with eclipse.
    """

    parser = OptionParser(usage=usage)
    parser.add_option("-n", "--ndk", dest="ndk_build_param",
    help='Parameter for ndk-build')
    parser.add_option("-p", "--platform", dest="android_platform",
    help='Parameter for android-update. Without the parameter,the script just build dynamic library for the projects. Valid android-platform are:[10|11|12|13|14|15|16|17|18|19]')
    parser.add_option("-b", "--build", dest="build_mode",
    help='The build mode for java project,debug[default] or release. Get more information,please refer to http://developer.android.com/tools/building/building-cmdline.html')
    (opts, args) = parser.parse_args()

    if len(args) == 0:
        parser.print_help()
        sys.exit(1)
    else:
        try:
            build(args, opts.ndk_build_param,opts.android_platform,opts.build_mode)
        except Exception as e:
            print e
            sys.exit(1)
