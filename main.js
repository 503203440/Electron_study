//通过require函数取得electron的app对象和browserWindow
const {app,BrowserWindow}=require('electron');

//取得路径
const path=require('path');

//取得url对象
const url=require('url');

//申明窗口对象
let win;

//定义常量函数（创建窗口）
const createWindow = () => {

    //构建一个新窗口
    win = new BrowserWindow({
        width:980,
        height:600
    });
    win.setMenu(null);
    //定义常量URL并给定路径，协议，是否有双斜线
    const URL =url.format({

        // 这里可以指定一个网址，使用http协议前缀，也可以是本地的文件地址，使用file协议前缀
        // pathname:path.join('www.baidu.com'),
        // protocol:'http:',
        pathname:path.join('index.html'),
        protocol:'file',
        slashes:true

    });


    //将URL给窗口加载
    win.loadURL(URL);

    //打开开发者调试窗口
    //win.webContents.openDevTools();

    //关闭窗口事件
    win.on('close',()=>{
        win=null;        
    });

}


//应用程序加载事件，调用上面创建窗口的函数
app.on('ready',createWindow);

//应用程序所有窗口全部关闭事件
app.on('window-all-close',()=>{
    //判断机器是否为macOS，如果不是，则执行app.quit()关闭程序
    if(process.platform!=='darwin'){
        app.quit();
    }
});
//如果是macOS，点击X后，并没有关闭
app.on('activate',()=>{
    //当用户再次点击状态栏的应用图标后，再次执行创建窗口的函数
    if(win===null){
        createWindow();
    }
});