/****************************************************************************
Copyright (c) 2013 cocos2d-x.org

http://www.cocos2d-x.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
****************************************************************************/

#include "Runtime.h"

#include "SimpleAudioEngine.h"
#include "jsb_cocos2dx_auto.hpp"
#include "jsb_cocos2dx_extension_auto.hpp"
#include "jsb_cocos2dx_builder_auto.hpp"
#include "extension/jsb_cocos2dx_extension_manual.h"
#include "cocosbuilder/js_bindings_ccbreader.h"
#include "localstorage/js_bindings_system_registration.h"
#include "chipmunk/js_bindings_chipmunk_registration.h"
#include "jsb_opengl_registration.h"
#include "cocos2d.h"
#include "json/document.h"
#include "json/filestream.h"
#include "json/stringbuffer.h"
#include "json/writer.h"
#include "VisibleRect.h"
#include "ConfigParser.h"
#include "Protos.pb.h"
#include "zlib.h"

#ifdef _WIN32
#define realpath(dir,fuldir) _fullpath(fuldir,dir,_MAX_PATH_)
#include <direct.h>
#else
#include <unistd.h>
#include <limits.h>
#include <dirent.h>
#include <unistd.h>
#include <sys/stat.h>
#include <stdio.h>
#endif

#include <vector>
#include <string>

using namespace std;
using namespace cocos2d;

std::string g_resourcePath;

//1M size 
#define MAXPROTOLENGTH 1048576
#if (CC_TARGET_PLATFORM == CC_PLATFORM_WIN32)
#define usleep(t) Sleep(t)
#else
#include <unistd.h>
#define usleep(t) usleep(t)
#endif

extern string getIPAddress();
extern bool browseDir(const char *dir,const char *filespec,vector<string> &filterArray,vector<std::string> &fileList);
/*@brief   use "|" splite string  */
const char* getRuntimeVersion()
{
    return "1.2";
}

vector<string> splitFilter(const char *str)
{
    vector<string> filterArray;
    if (str)
    {
        char *token=NULL;
        char szFilterFile[_MAX_PATH_]={0};
        strcpy(szFilterFile,str);
        token = strtok(szFilterFile, "|" );		
        while( token != NULL )
        {
            filterArray.push_back(token);
            token = strtok( NULL, "|");
        }
    }
    return filterArray;
}

/*@brief wildcard funciton*/
bool wildcardMatches(const char *wildcard, const char *str) 
{
    while (1) {
        if (*wildcard == '\0')
        {
            return *str == '\0';
        }
        if (*wildcard == '?') 
        {
            ++wildcard; ++str;
        } 
        else if (*wildcard == '*') 
        {
            for (++wildcard; *str; ++str)
            {
                if (wildcardMatches(wildcard, str))
                {
                    return true;
                }
            }
            return *wildcard == '\0';
        } 
        else 
        {
            if (*wildcard != *str)
            {
                return false;
            }
            ++wildcard; ++str;
        }
    }
}


#ifndef _WIN32
#pragma warning(disable:4099)
/*
*@brief iterator directory and process file.
*/
bool browseDir(const char *dir,const char *filespec,vector<string> &filterArray,vector<std::string> &fileList)
{
    DIR *dp=NULL;
    struct dirent *entry=NULL;
    struct stat statbuf;
    if((dp = opendir(dir)) == NULL) 
    {
        return false;
    }

    if (chdir(dir) != 0)
    {
        return false;
    }

    while((entry = readdir(dp)) != NULL) 
    {
        lstat(entry->d_name,&statbuf);
        if(S_ISDIR(statbuf.st_mode)) 
        {
            if(strcmp(".",entry->d_name) == 0 ||strcmp("..",entry->d_name) == 0)
            {
                continue;
            }

            if (find(filterArray.begin(),filterArray.end(),entry->d_name) != filterArray.end())
            {
                continue;
            }

            char subdir[_MAX_PATH_]={0};
            sprintf(subdir,"%s%s/",dir,entry->d_name);
            if (!browseDir(subdir,filespec,filterArray,fileList))
            {
                closedir(dp);
                return false;
            }
        } 
        else 
        {

            if (!wildcardMatches(filespec,entry->d_name))
            {
                continue;
            }

            char *pszexten=strrchr(entry->d_name,'.');
            char szextension[_MAX_PATH_]={0};
            if (pszexten)
            {
                strcpy(szextension,"*");
                strcat(szextension,pszexten);
                if (find(filterArray.begin(),filterArray.end(),szextension) != filterArray.end())
                {
                    continue;
                }
            }

            strcpy(szextension,entry->d_name);
            if (find(filterArray.begin(),filterArray.end(),szextension) != filterArray.end())
            {
                continue;
            }

            char fullFileName[_MAX_PATH_] ={0};
            sprintf(fullFileName,"%s%s",dir,entry->d_name);
            fileList.push_back(fullFileName);
        }
    }
    chdir("..");
    closedir(dp);
    return true;
}
#endif


/************************
* Get file list from specified directory. 
*
*@param dir		    search directory
*@param filespec    search specified type file
*@param filterfile  filter file or folder
*
*Like this:
*    searchFileList("/home","*.*",".svn|.jpg|");  
*********************************/
vector<std::string> searchFileList(string &dir,const char *filespec="*.*",const char *filterfile=NULL)
{
    char fulldir[_MAX_PATH_]={0};
    vector<string> _filterArray;
    vector<std::string> _lfileList;
    _filterArray = splitFilter(filterfile);

    if (realpath(dir.c_str(), fulldir)== NULL)
    {
        return _lfileList;
    }

    int len=strlen(fulldir);
    if (fulldir[len-1] != '/')
    {
        strcat(fulldir,"/");
    }

    browseDir(fulldir,filespec,_filterArray,_lfileList);
    dir =fulldir;
    return _lfileList;
}

bool startScript()
{
    ScriptEngineProtocol *engine = ScriptingCore::getInstance();
    ScriptEngineManager::getInstance()->setScriptEngine(engine);
    return ScriptingCore::getInstance()->runScript(ConfigParser::getInstance()->getEntryFile().c_str());
}

bool reloadScript(const string& file,bool reloadAll)
{

    auto director = Director::getInstance();
    FontFNT::purgeCachedData();
    if (director->getOpenGLView())
    {
        SpriteFrameCache::getInstance()->removeSpriteFrames();
        director->getTextureCache()->removeAllTextures();
    }
    FileUtils::getInstance()->purgeCachedEntries();

    //director->getScheduler()->unscheduleAll();
    //director->getScheduler()->scheduleUpdate(director->getActionManager(), Scheduler::PRIORITY_SYSTEM, false);
    
    string modulefile = file;
    if (modulefile.empty())
    {
        modulefile = ConfigParser::getInstance()->getEntryFile().c_str();
        ScriptingCore::getInstance()->cleanScript(modulefile.c_str());
    }
    if (reloadAll)
    {
        ScriptingCore::getInstance()->cleanAllScript();
    }
    return ScriptingCore::getInstance()->runScript(modulefile.c_str());
    
}

#if defined(_MSC_VER) || defined(__MINGW32__)
#include <io.h>
#include <WS2tcpip.h>

#define bzero(a, b) memset(a, 0, b);

#else
#include <netdb.h>
#include <unistd.h>
#include <arpa/inet.h>
#include <netinet/in.h>
#include <sys/socket.h>
#include <sys/un.h>
#endif

class  FileServer
{
   static FileServer *s_sharedFileServer;
public:
    static FileServer* getShareInstance(){
        if (s_sharedFileServer == nullptr){
            s_sharedFileServer=new FileServer();
        }
        return s_sharedFileServer;
    }
    bool listenOnTCP(int port);
    void stop();
    
    void readResFileFinfo();
    void addResFileInfo(const char* filename,uint64_t u64);
    void removeResFileInfo(const char *filename);
    rapidjson::Document* getFileCfgJson(){
        return &_filecfgjson;
    };
    string getTransingFileName(){
        _fileNameMutex.lock();
        string filename = _strFileName;
        _fileNameMutex.unlock();
        return filename;
    }
protected:
    FileServer(){
        _listenfd = -1;
        _running = false;
        _endThread = false;
        _protoBuf =nullptr;
    }
    ~FileServer(){
        CC_SAFE_DELETE_ARRAY(_protoBuf);
    }
private:
    void loopReceiveFile();
    void loopWriteFile();
    void loopResponse();
    void addResponse(int fd, string filename,int errortype,int errornum);
    enum PROTONUM
    {
        FILEPROTO=1,
        FILESENDCOMPLETE=2,
        DIRPROTO=3,
        DIRSENDCOMPLETE=4
    };
    struct RecvBufStruct
    {
        runtime::FileSendProtos fileProto;
        std::string contentBuf;
        int fd;
    };
    struct ResponseStruct
    {
        runtime::FileSendComplete fileResponseProto;
        int fd;
    };
    // file descriptor: socket, console, etc.
    int _listenfd;
    int _maxfd;
    std::vector<int> _fds;
    std::thread _responseThread;
    std::thread _receiveThread;
    std::thread _writeThread;
    fd_set _read_set;
    bool _running;
    bool _endThread;
    char *_protoBuf;
    std::list<RecvBufStruct> _recvBufList;
    std::list<ResponseStruct> _responseBufList;
    std::mutex _recvBufListMutex;
    std::mutex _responseBufListMutex;
    rapidjson::Document _filecfgjson; 
    string _strFileName;
    std::mutex _fileNameMutex;
    string _recvErrorFile;
    string _writeErrorFile;
};
FileServer* FileServer::s_sharedFileServer =nullptr;
void FileServer::readResFileFinfo()
{
    string filecfg = g_resourcePath;
    filecfg.append("/");
    filecfg.append("fileinfo_debug.json");
    FILE * pFile = fopen (filecfg.c_str() , "r");
    if(pFile){
        rapidjson::FileStream inputStream(pFile);
        _filecfgjson.ParseStream<0>(inputStream);
        fclose(pFile);
    }
    if(!_filecfgjson.IsObject()){
        _filecfgjson.SetObject();
    }
    Director::getInstance()->getScheduler()->schedule([&](float){
        rapidjson::StringBuffer buffer;
        rapidjson::Writer< rapidjson::StringBuffer > writer(buffer);
        _filecfgjson.Accept(writer);
        const char* str = buffer.GetString();
        string filecfg = g_resourcePath;
        filecfg.append("/");
        filecfg.append("fileinfo_debug.json");
        FILE * pFile = fopen (filecfg.c_str() , "w");
        if (!pFile) return ;
        fwrite(str,sizeof(char),strlen(str),pFile);
        fclose(pFile);
    },this, 10.0f, false, "fileinfo");
}
void FileServer::addResFileInfo(const char* filename,uint64_t u64)
{
    if (_filecfgjson.HasMember(filename)){
        _filecfgjson.RemoveMember(filename);
    }
    char filetime[512]= {0};
    sprintf(filetime,"%llu",u64);
    rapidjson::Value filetimeValue(rapidjson::kStringType);
    filetimeValue.SetString(filetime,_filecfgjson.GetAllocator());
    rapidjson::Value filenameValue(rapidjson::kStringType);
    filenameValue.SetString(filename,_filecfgjson.GetAllocator());
    _filecfgjson.AddMember(filenameValue.GetString(),filetimeValue,_filecfgjson.GetAllocator());
}
void FileServer::removeResFileInfo(const char *filename)
{
    if (_filecfgjson.HasMember(filename)) {
        _filecfgjson.RemoveMember(filename);
    }
}

bool FileServer::listenOnTCP(int port)
{
    int listenfd, n;
    const int on = 1;
    struct addrinfo hints, *res, *ressave;
    char serv[30];

    snprintf(serv, sizeof(serv)-1, "%d", port );
    serv[sizeof(serv)-1]=0;

    bzero(&hints, sizeof(struct addrinfo));
    hints.ai_flags = AI_PASSIVE;
    hints.ai_family = AF_INET; // AF_UNSPEC: Do we need IPv6 ?
    hints.ai_socktype = SOCK_STREAM;

#if (CC_TARGET_PLATFORM == CC_PLATFORM_WIN32)
    WSADATA wsaData;
    n = WSAStartup(MAKEWORD(2, 2),&wsaData);
#endif

    if ( (n = getaddrinfo(NULL, serv, &hints, &res)) != 0) {
        fprintf(stderr,"net_listen error for %s: %s", serv, gai_strerror(n));
        return false;
    }

    ressave = res;
    do {
        listenfd = socket(res->ai_family, res->ai_socktype, res->ai_protocol);
        if (listenfd < 0)
            continue;       /* error, try next one */
        
        setsockopt(listenfd, SOL_SOCKET, SO_REUSEADDR, (const char*)&on, sizeof(on));
        if (::bind(listenfd, res->ai_addr, res->ai_addrlen) == 0)
            break;          /* success */
        
        close(listenfd);    /* bind error, close and try next one */
    } while ( (res = res->ai_next) != NULL);

    if (res == NULL) {
        perror("net_listen:");
        freeaddrinfo(ressave);
        return false;
    }

    listen(listenfd, 1);

    if (res->ai_family == AF_INET) 
    {
        char buf[INET_ADDRSTRLEN] = "";
        struct sockaddr_in *sin = (struct sockaddr_in*) res->ai_addr;
        if( inet_ntop(res->ai_family, &sin->sin_addr, buf, sizeof(buf)) != NULL )
            cocos2d::log("Console: listening on  %s : %d", buf, ntohs(sin->sin_port));
        else
            perror("inet_ntop");
    } else if (res->ai_family == AF_INET6) 
    {
        char buf[INET6_ADDRSTRLEN] = "";
        struct sockaddr_in6 *sin = (struct sockaddr_in6*) res->ai_addr;
        if( inet_ntop(res->ai_family, &sin->sin6_addr, buf, sizeof(buf)) != NULL )
            cocos2d::log("Console: listening on  %s : %d", buf, ntohs(sin->sin6_port));
        else
            perror("inet_ntop");
    }
    freeaddrinfo(ressave);
    _listenfd = listenfd;
    _receiveThread = std::thread( std::bind( &FileServer::loopReceiveFile, this) );
    _writeThread = std::thread(std::bind(&FileServer::loopWriteFile, this));
    _responseThread = std::thread(std::bind(&FileServer::loopResponse, this));
    return true;	
}
    
void FileServer::stop()
{
    if( _running ) {
        _endThread = true;
        _receiveThread.join();
        _writeThread.join();
        _responseThread.join();
    }
}

string& replaceAll(string& str,const string& old_value,const string& new_value)
{
    while(true)
    {
        int pos=0;
        if((pos=str.find(old_value,0))!=string::npos)
            str.replace(pos,old_value.length(),new_value);
        else break;
    }
    return str;
}

bool CreateDir(const char *sPathName)
{
    char   DirName[256]={0};
    strcpy(DirName,   sPathName);
    int   i,len   =   strlen(DirName);
    if(DirName[len-1]!='/')
        strcat(DirName,   "/");
    
    len   =   strlen(DirName);
    for(i=1;   i<len;   i++)
    {
        if(DirName[i]=='/')
        {
            DirName[i]   =   0;
            if(access(DirName,   NULL)!=0   )
            {
#ifdef _WIN32
                if(_mkdir(DirName/*,   0755*/)==-1)
#else
                if(mkdir(DirName,   0755)==-1)
#endif
                {
                    perror("mkdir   error");
                    return  false;
                }
            }  
            DirName[i]   =   '/';  
        }  
    }  
    
    return   true;  
}

void recvBuf(int fd,char *pbuf,int bufsize)
{

    int startFlagLen = bufsize;
    while (startFlagLen != 0){
    
        int recvlen = recv(fd, pbuf+bufsize-startFlagLen,startFlagLen ,0);
        if (recvlen<=0) {
            usleep(1);
            continue;
        }
        startFlagLen -= recvlen;
    }
}

void FileServer::loopReceiveFile()
{
    struct sockaddr client;
    socklen_t client_len;
    client_len = sizeof( client );
    int fd = accept(_listenfd, (struct sockaddr *)&client, &client_len );
    if (_protoBuf == nullptr){
        _protoBuf = new char[MAXPROTOLENGTH];
    }

    while(!_endThread) { 

        // recv start flag
        char startflag[13]={0};
        recvBuf(fd,startflag,sizeof(startflag)-1);
        if (strcmp(startflag,"RuntimeSend:")!=0){
            continue;
    }
    
        union 
        {
            char char_type[3];
            unsigned short uint16_type;
        }protonum;
        recvBuf(fd,protonum.char_type,sizeof(protonum.char_type) - 1);
        union 
        {
            char char_type[3];
            unsigned short uint16_type;
        }protolength;
        recvBuf(fd,protolength.char_type,sizeof(protolength.char_type) - 1);
        memset(_protoBuf,0,MAXPROTOLENGTH);
        recvBuf(fd,_protoBuf,protolength.uint16_type);
        RecvBufStruct recvDataBuf;
        recvDataBuf.fd = fd;
        recvDataBuf.fileProto.ParseFromString(_protoBuf);
        if (1 == recvDataBuf.fileProto.package_seq()){
            _recvErrorFile = "";
        }else{
            if (_recvErrorFile == recvDataBuf.fileProto.file_name()){
                continue;
            }
        }
        int contentSize = recvDataBuf.fileProto.content_size();
        if (contentSize>0){  
            Bytef *contentbuf= new Bytef[contentSize+1];
            memset(contentbuf,0,contentSize+1);
            int recvTotalLen = contentSize;
            while (recvTotalLen != 0){
                int recvLen = MAXPROTOLENGTH;
                if(recvTotalLen < MAXPROTOLENGTH)
                    recvLen = recvTotalLen;
                memset(_protoBuf,0,MAXPROTOLENGTH);
                int result= recv(fd, _protoBuf, recvLen,0);
                if (result<=0) {
                    usleep(1);
                    continue;
                }
                memcpy(contentbuf+contentSize-recvTotalLen,_protoBuf,result);
                recvTotalLen -= result;
             }
        
            if (recvDataBuf.fileProto.compress_type() == runtime::FileSendProtos_CompressType::FileSendProtos_CompressType_ZIP){
                unsigned long uncompressSize = recvDataBuf.fileProto.uncompress_size();
                Bytef *buff = new Bytef[uncompressSize * sizeof(Bytef)];
                memset(buff, 0, uncompressSize * sizeof(Bytef));
                int err = ::uncompress(buff, &uncompressSize,contentbuf, contentSize * sizeof(Bytef));
                if (err != Z_OK){
                    CC_SAFE_DELETE_ARRAY(buff);
                    CC_SAFE_DELETE_ARRAY(contentbuf);
                    addResponse(recvDataBuf.fd,recvDataBuf.fileProto.file_name(),runtime::FileSendComplete::RESULTTYPE::FileSendComplete_RESULTTYPE_UNCOMPRESS_ERROR,err);
                    continue;
                }
                CC_SAFE_DELETE_ARRAY(contentbuf);
                contentbuf = buff;
                contentSize = uncompressSize; 
            }
            recvDataBuf.contentBuf.assign((const char*)contentbuf,contentSize);
            CC_SAFE_DELETE_ARRAY(contentbuf);
            _recvBufListMutex.lock();
            _recvBufList.push_back(recvDataBuf);
            _recvBufListMutex.unlock();
            }
        }
    }
    
void FileServer::loopWriteFile()
{
     while(!_endThread) { 
         _recvBufListMutex.lock();
         int recvSize = _recvBufList.size();
         _recvBufListMutex.unlock();
         if(0 == recvSize){
             usleep(500);
             continue;
         }
         _recvBufListMutex.lock();
         RecvBufStruct recvDataBuf = _recvBufList.front();
         _recvBufList.pop_front();
         _recvBufListMutex.unlock();
         string filename = recvDataBuf.fileProto.file_name();
         string fullfilename = g_resourcePath;
         fullfilename += filename;

         _fileNameMutex.lock();
         _strFileName = filename;
         _fileNameMutex.unlock();
         cocos2d::log("WriteFile:: fullfilename = %s",filename.c_str());
         CreateDir(fullfilename.substr(0,fullfilename.find_last_of("/")).c_str());
         FILE *fp= nullptr;
         if (1 == recvDataBuf.fileProto.package_seq()){
             _writeErrorFile ="";
             fp=fopen(fullfilename.c_str(), "wb");
         }else{
             if (_writeErrorFile == filename){
                 continue;
             }
             fp=fopen(fullfilename.c_str(), "ab");
        }
         if (nullptr == fp){
              addResponse(recvDataBuf.fd,filename,runtime::FileSendComplete::RESULTTYPE::FileSendComplete_RESULTTYPE_FOPEN_ERROR,errno);
            continue;
         }
         if (fp){
             if (0 == fwrite(recvDataBuf.contentBuf.c_str(), sizeof(char), recvDataBuf.contentBuf.size(),fp)){
                 addResponse(recvDataBuf.fd,filename,runtime::FileSendComplete::RESULTTYPE::FileSendComplete_RESULTTYPE_FWRITE_ERROR,errno);
                 fclose(fp);
                 continue;
             }
             fclose(fp);
         }

         if (1 == recvDataBuf.fileProto.package_seq()){ // == recvDataBuf.fileProto.package_sum()
             addResFileInfo(filename.c_str(),recvDataBuf.fileProto.modified_time());
             addResponse(recvDataBuf.fd,filename,runtime::FileSendComplete::RESULTTYPE::FileSendComplete_RESULTTYPE_SUCCESS,0);
            }
        }
    }

void FileServer::addResponse(int fd, string filename,int errortype,int errornum)
{
    
    switch (errortype)
    {
    case runtime::FileSendComplete::RESULTTYPE::FileSendComplete_RESULTTYPE_UNCOMPRESS_ERROR:
    case runtime::FileSendComplete::RESULTTYPE::FileSendComplete_RESULTTYPE_RECV_ERROR:
        _recvErrorFile = filename;
        break;
    case runtime::FileSendComplete::RESULTTYPE::FileSendComplete_RESULTTYPE_FOPEN_ERROR:
    case runtime::FileSendComplete::RESULTTYPE::FileSendComplete_RESULTTYPE_FWRITE_ERROR:
        _writeErrorFile = filename;
        break;
    default:
        break;
    // add fd to list of FD
    }
    ResponseStruct responseBuf;
    responseBuf.fd = fd;
    responseBuf.fileResponseProto.set_file_name(filename.c_str());
    responseBuf.fileResponseProto.set_result((::runtime::FileSendComplete_RESULTTYPE)errortype);
    responseBuf.fileResponseProto.set_error_num(errornum);
    _responseBufListMutex.lock();
    _responseBufList.push_back(responseBuf);
    _responseBufListMutex.unlock();
}

void FileServer::loopResponse()
{
    while(!_endThread) {

        _responseBufListMutex.lock();
        int responseSize =  _responseBufList.size();
        _responseBufListMutex.unlock();

        if(0 == responseSize){
            usleep(500);
            /* error */
            continue;
        }

        _responseBufListMutex.lock();
        ResponseStruct responseBuf = _responseBufList.front();
        _responseBufList.pop_front();
        _responseBufListMutex.unlock();
        string responseString;
        runtime::FileSendComplete  fileSendProtoComplete;
        fileSendProtoComplete.set_file_name(responseBuf.fileResponseProto.file_name());
        fileSendProtoComplete.set_result(responseBuf.fileResponseProto.result());
        fileSendProtoComplete.set_error_num(responseBuf.fileResponseProto.error_num());
        fileSendProtoComplete.SerializeToString(&responseString);
        char dataBuf[1024] ={0};
        struct ResponseStruct 
        {
            char startFlag[12];
            unsigned short protoNum;
            unsigned short protoBufLen;
        };
        ResponseStruct responseData;
        strcpy(responseData.startFlag,"RuntimeSend:");
        responseData.protoNum=PROTONUM::FILESENDCOMPLETE;
        responseData.protoBufLen= (unsigned short)responseString.size();
        memcpy(dataBuf,&responseData,sizeof(responseData));
        memcpy(dataBuf+sizeof(responseData),responseString.c_str(),responseString.size());
        cocos2d::log("responseFile:%s,result:%d",fileSendProtoComplete.file_name().c_str(),fileSendProtoComplete.result());
        int sendLen = send(responseBuf.fd, dataBuf, sizeof(responseData)+responseString.size(),0);
    }
}

class ConnectWaitLayer: public Layer
{
private:
    Label* _labelUploadFile;
    string _transferTip;
public:
    ConnectWaitLayer()
    {
#include "ResData.h"
        int designWidth = 1280;
        int designHeight = 800;
        string fontName = "Arial";
        if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID){
            fontName = "DroidSans";
        }
        Director::getInstance()->getOpenGLView()->setDesignResolutionSize(designWidth,designHeight,ResolutionPolicy::EXACT_FIT);
        Image* imagebg = new Image();
        imagebg->initWithImageData(__landscapePngData, sizeof(__landscapePngData));
        if (!ConfigParser::getInstance()->isLanscape()){
            imagebg->initWithImageData(__portraitPngData, sizeof(__portraitPngData));
            Director::getInstance()->getOpenGLView()->setDesignResolutionSize(designHeight,designWidth,ResolutionPolicy::EXACT_FIT);
        }
        Texture2D* texturebg = Director::getInstance()->getTextureCache()->addImage(imagebg, "play_background");
        auto background = Sprite::createWithTexture(texturebg);
        background->setAnchorPoint(Vec2(0,0));
        addChild(background,9000);

        int portraitX = 400;
        int portraitY = 500;
        int lanscaptX = 902;
        int lanscaptY = 400;
        Image* imageplay = new Image();
        imageplay->initWithImageData(__playEnablePngData, sizeof(__playEnablePngData));
        Texture2D* textureplay = Director::getInstance()->getTextureCache()->addImage(imageplay, "play_enable");
        auto playSprite = Sprite::createWithTexture(textureplay);
        playSprite->setPosition(Vec2(lanscaptX,lanscaptY));
        addChild(playSprite,9999);
        Image* imageShine = new Image();
        imageShine->initWithImageData(__shinePngData, sizeof(__shinePngData));
        Texture2D* textureShine = Director::getInstance()->getTextureCache()->addImage(imageShine, "Shine");
        auto shineSprite = Sprite::createWithTexture(textureShine);
        shineSprite->setOpacity(0);
        shineSprite->setPosition(Vec2(lanscaptX,lanscaptY));
        Vector<FiniteTimeAction*> arrayOfActions;
        arrayOfActions.pushBack(DelayTime::create(0.4f));
        arrayOfActions.pushBack(FadeTo::create(0.8f,200));
        arrayOfActions.pushBack(FadeTo::create(0.8f,255));
        arrayOfActions.pushBack(FadeTo::create(0.8f,200));
        arrayOfActions.pushBack(FadeTo::create(0.8f,0));
        arrayOfActions.pushBack(DelayTime::create(0.4f));
        Sequence * arrayAction = Sequence::create(arrayOfActions);
        shineSprite->runAction(RepeatForever::create(Sequence::create(arrayOfActions)));
        addChild(shineSprite,9998);
        string strip = getIPAddress();
        char szIPAddress[512]={0};
        sprintf(szIPAddress, "IP: %s",strip.c_str());
        auto IPlabel = Label::create();
        IPlabel->setString(szIPAddress);
        IPlabel->setSystemFontName(fontName.c_str());
        IPlabel->setSystemFontSize(72);
        IPlabel->setAnchorPoint(Vec2(0,0));
        int spaceSizex = 72;
        int spaceSizey = 200;
        IPlabel->setPosition( Point(VisibleRect::leftTop().x+spaceSizex, VisibleRect::top().y -spaceSizey) );
        addChild(IPlabel, 9001);
        _transferTip = "waiting for file transfer ...";
        if (CC_PLATFORM_WIN32 == CC_TARGET_PLATFORM || CC_PLATFORM_MAC == CC_TARGET_PLATFORM){
            _transferTip = "waiting for debugger to connect ...";
        }
        char szVersion[1024]={0};
        sprintf(szVersion,"runtimeVersion:%s \ncocos2dVersion:%s",getRuntimeVersion(),cocos2dVersion());
        Label* verLable = Label::create();
        verLable->setString(szVersion);
        verLable->setSystemFontName(fontName.c_str());
        verLable->setSystemFontSize(24);
        verLable->setAnchorPoint(Vec2(0,0));
        int width = verLable->getBoundingBox().size.width;
        int height = verLable->getBoundingBox().size.height;
        verLable->setPosition( Point(VisibleRect::right().x-width, VisibleRect::rightBottom().y) );
        verLable->setAlignment(TextHAlignment::LEFT);
        addChild(verLable, 9002);
        _labelUploadFile = Label::create();
        _labelUploadFile->setString(_transferTip);
        _labelUploadFile->setSystemFontName(fontName.c_str());
        _labelUploadFile->setSystemFontSize(36);
        _labelUploadFile->setAnchorPoint(Vec2(0,0));
        _labelUploadFile->setPosition( Point(VisibleRect::leftTop().x+spaceSizex, IPlabel->getPositionY()-spaceSizex) );
        _labelUploadFile->setAlignment(TextHAlignment::LEFT);
        addChild(_labelUploadFile, 9003);
        if (!ConfigParser::getInstance()->isLanscape())
        {
            if (playSprite)   playSprite->setPosition(portraitX,portraitY);
            if (shineSprite)  shineSprite->setPosition(portraitX,portraitY);
            _labelUploadFile->setAlignment(TextHAlignment::LEFT);
        }

        auto listener = EventListenerTouchOneByOne::create();
        listener->onTouchBegan = [](Touch* touch, Event  *event)->bool{
            auto target = static_cast<Sprite*>(event->getCurrentTarget());
            Vec2 point = target->convertToNodeSpace(Director::getInstance()->convertToGL(touch->getLocationInView()));
            auto rect = Rect(0, 0, target->getContentSize().width, target->getContentSize().height);
            if (!rect.containsPoint(point)) return false;
            target->stopAllActions();
            target->runAction(Sequence::createWithTwoActions(ScaleBy::create(0.05f, 0.9f),ScaleTo::create(0.125f, 1)));
            return true;
        };
        listener->onTouchEnded = [](Touch* touch, Event  *event){
            auto target = static_cast<Sprite*>(event->getCurrentTarget());
            Vec2 point = target->convertToNodeSpace(Director::getInstance()->convertToGL(touch->getLocationInView()));
            auto rect = Rect(0, 0, target->getContentSize().width, target->getContentSize().height);
            if (!rect.containsPoint(point)) return;
            startScript();
        };
        _eventDispatcher->addEventListenerWithSceneGraphPriority(listener, playSprite);
        this->scheduleUpdate();
    }

    // clean up: ignore stdin, stdout and stderr
    void update( float fDelta )  
    {
        _transferTip=FileServer::getShareInstance()->getTransingFileName();
        if (_transferTip.empty()){
            return;
        }
        _labelUploadFile->setString(_transferTip);
    }
};

class ConsoleCustomCommand
{
public:
    void init()
    {
        cocos2d::Console *_console = Director::getInstance()->getConsole();
        static struct Console::Command commands[] = {
            {"sendrequest","send command to runtime.Args[json format]",std::bind(&ConsoleCustomCommand::onSendCommand, this, std::placeholders::_1, std::placeholders::_2)},
        };
        for (int i=0;i< sizeof(commands)/sizeof(Console::Command);i++) {
            _console->addCommand(commands[i]);
        }
        _console->listenOnTCP(6050);
        
        _fileserver= FileServer::getShareInstance();
        _fileserver->listenOnTCP(6060);
        _fileserver->readResFileFinfo();
    }
    ~ConsoleCustomCommand()
    {
        Director::getInstance()->getConsole()->stop();
        _fileserver->stop();
    }

    
    void onSendCommand(int fd, const std::string &args)
    {
            Director::getInstance()->getScheduler()->performFunctionInCocosThread([=](){
            rapidjson::Document dArgParse;
            dArgParse.Parse<0>(args.c_str());
            if (dArgParse.HasMember("cmd"))
            {
                string strcmd = dArgParse["cmd"].GetString();
                
                rapidjson::Document dReplyParse;
                dReplyParse.SetObject();
                dReplyParse.AddMember("cmd",strcmd.c_str(),dReplyParse.GetAllocator());
                if (dArgParse.HasMember("seq")) {
                    dReplyParse.AddMember("seq",dArgParse["seq"],dReplyParse.GetAllocator());
                }
                
                if (strcmp(strcmd.c_str(),"start-logic")==0)
                {
                    if (startScript())
                    {
                        dReplyParse.AddMember("code",0,dReplyParse.GetAllocator());
                    }else
                    {
                        dReplyParse.AddMember("code",1,dReplyParse.GetAllocator());
                    }
                    
                }else if(strcmp(strcmd.c_str(),"precompile")==0)
                {
                    bool compileAll = false;
                    if (dArgParse.HasMember("modulefiles"))
                    {
                        rapidjson::Value bodyvalue(rapidjson::kObjectType);
                        const rapidjson::Value& objectfiles = dArgParse["modulefiles"];
                        for (rapidjson::SizeType i = 0; i < objectfiles.Size(); i++)
                        {
                            ScriptingCore::getInstance()->cleanScript(objectfiles[i].GetString());
                            ScriptingCore::getInstance()->compileScript(objectfiles[i].GetString());
                        }
                        if (0 == objectfiles.Size()) {
                            compileAll = true;
                        }
                    }else{
                        compileAll = true;
                    }
                    if (compileAll) {
                        vector<std::string> fileInfoList = searchFileList(g_resourcePath,"*.js","runtime|frameworks|");
                        for (unsigned i = 0; i < fileInfoList.size(); i++)
                        {
                            ScriptingCore::getInstance()->cleanScript(fileInfoList[i].substr(g_resourcePath.length(),-1).c_str());
                            ScriptingCore::getInstance()->compileScript(fileInfoList[i].substr(g_resourcePath.length(),-1).c_str());
                        }
                    }
                    dReplyParse.AddMember("code",0,dReplyParse.GetAllocator());
                }else if(strcmp(strcmd.c_str(),"reload")==0)
                {
                    if (dArgParse.HasMember("modulefiles")){
                        rapidjson::Value bodyvalue(rapidjson::kObjectType);
                        const rapidjson::Value& objectfiles = dArgParse["modulefiles"];
                        for (rapidjson::SizeType i = 0; i < objectfiles.Size(); i++){
                            if (!reloadScript(objectfiles[i].GetString())) {
                                bodyvalue.AddMember(objectfiles[i].GetString(),1,dReplyParse.GetAllocator());
                            }
                        }
                        if (0 == objectfiles.Size()) {
                            reloadScript("");
                        }
                        dReplyParse.AddMember("body",bodyvalue,dReplyParse.GetAllocator());
                    }else
                    {
                        reloadScript("");
                    }
                    dReplyParse.AddMember("code",0,dReplyParse.GetAllocator());
                }else if(strcmp(strcmd.c_str(),"getversion")==0)
                {
                    rapidjson::Value bodyvalue(rapidjson::kObjectType);
                    bodyvalue.AddMember("version",getRuntimeVersion(),dReplyParse.GetAllocator());
                    dReplyParse.AddMember("body",bodyvalue,dReplyParse.GetAllocator());
                    dReplyParse.AddMember("code",0,dReplyParse.GetAllocator());
                }else if(strcmp(strcmd.c_str(),"getfileinfo")==0){
                    rapidjson::Value bodyvalue(rapidjson::kObjectType);
                    rapidjson::Document* filecfgjson = _fileserver->getFileCfgJson();
                    for (auto it=filecfgjson->MemberonBegin();it!=filecfgjson->MemberonEnd();++it){
                        bodyvalue.AddMember(it->name.GetString(),it->value.GetString(),dReplyParse.GetAllocator());
                    }
                    dReplyParse.AddMember("body",bodyvalue,dReplyParse.GetAllocator());
                    dReplyParse.AddMember("code",0,dReplyParse.GetAllocator());
                   
                }else if (strcmp(strcmd.c_str(),"getEntryfile")==0){
                    rapidjson::Value bodyvalue(rapidjson::kObjectType);
                    rapidjson::Value entryFileValue(rapidjson::kStringType);
                    entryFileValue.SetString(ConfigParser::getInstance()->getEntryFile().c_str(),dReplyParse.GetAllocator());
                    bodyvalue.AddMember("entryfile",entryFileValue,dReplyParse.GetAllocator());
                    dReplyParse.AddMember("body",bodyvalue,dReplyParse.GetAllocator());
                    dReplyParse.AddMember("code",0,dReplyParse.GetAllocator());
                }else if(strcmp(strcmd.c_str(),"getIP")==0){
                    rapidjson::Value bodyvalue(rapidjson::kObjectType);
                    rapidjson::Value IPValue(rapidjson::kStringType);
                    IPValue.SetString(getIPAddress().c_str(),dReplyParse.GetAllocator());
                    bodyvalue.AddMember("IP",IPValue,dReplyParse.GetAllocator());
                    dReplyParse.AddMember("body",bodyvalue,dReplyParse.GetAllocator());
                    dReplyParse.AddMember("code",0,dReplyParse.GetAllocator());

                }else if(strcmp(strcmd.c_str(),"remove")==0)
                {
                    if (dArgParse.HasMember("files"))
                    {
                        rapidjson::Value bodyvalue(rapidjson::kObjectType);
                        const rapidjson::Value& objectfiles = dArgParse["files"];
                        for (rapidjson::SizeType i = 0; i < objectfiles.Size(); i++)
                        {
#if (CC_TARGET_PLATFORM == CC_PLATFORM_WIN32 || CC_PLATFORM_MAC == CC_TARGET_PLATFORM)
                            ScriptingCore::getInstance()->cleanScript(objectfiles[i].GetString());
#else
                            string filename(g_resourcePath);
                            filename.append("/");
                            filename.append(objectfiles[i].GetString());
                            if (FileUtils::getInstance()->isFileExist(filename)) {
                                if(remove(filename.c_str())==0){
                                    if (_fileserver)
                                        _fileserver->removeResFileInfo(objectfiles[i].GetString());
                                    }
                                else{
                                    bodyvalue.AddMember(objectfiles[i].GetString(),2,dReplyParse.GetAllocator());
                                }
                            }else{
                                bodyvalue.AddMember(objectfiles[i].GetString(),1,dReplyParse.GetAllocator());
                            }
#endif                            
                        }
                        dReplyParse.AddMember("body",bodyvalue,dReplyParse.GetAllocator());
                    }
                    dReplyParse.AddMember("code",0,dReplyParse.GetAllocator());

                }else if(strcmp(strcmd.c_str(),"shutdownapp")==0)
                {
#if (CC_TARGET_PLATFORM == CC_PLATFORM_WIN32)
                    extern void shutDownApp();
                    shutDownApp();
#else
                    exit(0);
#endif	
                }
                
                rapidjson::StringBuffer buffer;
                rapidjson::Writer< rapidjson::StringBuffer > writer(buffer);
                dReplyParse.Accept(writer);
                const char* str = buffer.GetString();
                char msgSize[64]={0x1,0};
                sprintf(msgSize+1,"%d:",strlen(str));
                string replymsg(msgSize);
                replymsg.append(str);
                send(fd,replymsg.c_str(),replymsg.size(),0);
            }
        });
    }
private:
    FileServer* _fileserver;
};

bool initRuntime()
{
#if (CC_TARGET_PLATFORM == CC_PLATFORM_WIN32)
#ifndef _DEBUG
    return false;
#endif
#elif(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
#ifdef NDEBUG
    return false;
#endif
#elif(CC_TARGET_PLATFORM == CC_PLATFORM_MAC || CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
#ifndef COCOS2D_DEBUG
    return false;
#endif
#endif

    vector<string> searchPathArray;
    searchPathArray=FileUtils::getInstance()->getSearchPaths();
#if (CC_TARGET_PLATFORM == CC_PLATFORM_WIN32 || CC_TARGET_PLATFORM == CC_PLATFORM_MAC)
    if (g_resourcePath.empty())
    {
        extern std::string getCurAppPath();
        string resourcePath = getCurAppPath();
#if (CC_TARGET_PLATFORM == CC_PLATFORM_WIN32)
        resourcePath.append("/../../");
#elif (CC_TARGET_PLATFORM == CC_PLATFORM_MAC)
        resourcePath.append("/../../../");
#endif
        resourcePath =replaceAll(resourcePath,"\\","/");
        g_resourcePath = resourcePath;
    }
    
#else
    g_resourcePath = FileUtils::getInstance()->getWritablePath();
    g_resourcePath += "debugruntime/";
#endif
    
    g_resourcePath=replaceAll(g_resourcePath,"\\","/");
    if (g_resourcePath.at(g_resourcePath.length()-1) != '/'){
        g_resourcePath.append("/");
    }
    
    searchPathArray.insert(searchPathArray.begin(),g_resourcePath);
    FileUtils::getInstance()->setSearchPaths(searchPathArray);

    return true;
}

bool runtime_FileUtils_addSearchPath(JSContext *cx, uint32_t argc, jsval *vp)
{
    jsval *argv = JS_ARGV(cx, vp);
    bool ok = true;
    JSObject *obj = JS_THIS_OBJECT(cx, vp);
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    cocos2d::FileUtils* cobj = (cocos2d::FileUtils *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "cocos2dx_FileUtils_addSearchPath : Invalid Native Object");
    if (argc == 1) {
        std::string arg0;
        ok &= jsval_to_std_string(cx, argv[0], &arg0);
        JSB_PRECONDITION2(ok, cx, false, "cocos2dx_FileUtils_addSearchPath : Error processing arguments");
        std::string argtmp = arg0;
        if (!FileUtils::getInstance()->isAbsolutePath(arg0))
            arg0 = g_resourcePath + arg0;
        cobj->addSearchPath(arg0);
#if(CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    if (!FileUtils::getInstance()->isAbsolutePath(argtmp))
        cobj->addSearchPath(argtmp);
#endif
        JS_SET_RVAL(cx, vp, JSVAL_VOID);
        return true;
    }

    JS_ReportError(cx, "cocos2dx_FileUtils_addSearchPath : wrong number of arguments: %d, was expecting %d", argc, 1);
    return false;
}

bool runtime_FileUtils_setSearchPaths(JSContext *cx, uint32_t argc, jsval *vp)
{
    jsval *argv = JS_ARGV(cx, vp);
    bool ok = true;
    JSObject *obj = JS_THIS_OBJECT(cx, vp);
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    cocos2d::FileUtils* cobj = (cocos2d::FileUtils *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_cocos2dx_FileUtils_setSearchPaths : Invalid Native Object");
    if (argc == 1) {
        std::vector<std::string> arg0;
        ok &= jsval_to_std_vector_string(cx, argv[0], &arg0);
        JSB_PRECONDITION2(ok, cx, false, "js_cocos2dx_FileUtils_setSearchPaths : Error processing arguments");

        std::vector<std::string> argtmp;
        for (int i = 0; i < arg0.size(); i++)
        {
            if (!FileUtils::getInstance()->isAbsolutePath(arg0[i]))
            {
                argtmp.push_back(arg0[i]);
                arg0[i] = g_resourcePath + arg0[i];
            }
        }
#if(CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
        arg0.insert(arg0.end(),argtmp.begin(),argtmp.end());
#endif
        cobj->setSearchPaths(arg0);
        JS_SET_RVAL(cx, vp, JSVAL_VOID);
        return true;
    }

    JS_ReportError(cx, "js_cocos2dx_FileUtils_setSearchPaths : wrong number of arguments: %d, was expecting %d", argc, 1);
    return false;
}

void register_FileUtils(JSContext *cx, JSObject *global) {
    JS::RootedValue  nsval(cx);
    JS::RootedObject ns(cx);
    JS_GetProperty(cx, global, "cc", &nsval);
    if (nsval == JSVAL_VOID) {
        return;
    } else {
        JS_ValueToObject(cx, nsval, &ns);
    }
    global = ns;

    JSObject  *tmpObj = JSVAL_TO_OBJECT(anonEvaluate(cx, global, "(function () { return cc.FileUtils.getInstance(); })()"));
    JS_DefineFunction(cx, tmpObj, "addSearchPath", runtime_FileUtils_addSearchPath, 1, JSPROP_PERMANENT | JSPROP_ENUMERATE);
    JS_DefineFunction(cx, tmpObj, "setSearchPaths", runtime_FileUtils_setSearchPaths, 1, JSPROP_PERMANENT | JSPROP_ENUMERATE);
}

bool startRuntime()
{
#if (CC_TARGET_PLATFORM == CC_PLATFORM_WIN32)
#ifndef _DEBUG
    return false;
#endif
#elif(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
#ifdef NDEBUG
    return false;
#endif
#elif(CC_TARGET_PLATFORM == CC_PLATFORM_MAC || CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
#ifndef COCOS2D_DEBUG
    return false;
#endif
#endif

    ScriptingCore::getInstance()->addRegisterCallback(register_FileUtils);

    static ConsoleCustomCommand s_customCommand;
    s_customCommand.init();
    ScriptingCore::getInstance()->start();
    ScriptingCore::getInstance()->enableDebugger();
    ScriptEngineProtocol *engine = ScriptingCore::getInstance();
    ScriptEngineManager::getInstance()->setScriptEngine(engine);

    auto scene = Scene::create();
    auto connectLayer = new ConnectWaitLayer();
    connectLayer->autorelease();
    auto director = Director::getInstance();
    scene->addChild(connectLayer);
    director->runWithScene(scene);
    return true;
}
