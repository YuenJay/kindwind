moment.locale("zh-cn");

//https://github.com/YuenJay/kindwind 

const {Sider,Footer,Header,Content} = Layout;
const MenuItemGroup = Menu.ItemGroup;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const ButtonGroup = Button.Group;


import {MainUI} from "./kw/main.js";
import {LoginForm} from "./kw/login.js";
import {EditPassword,UserProfile} from "./kw/usermenu.js";
import {iconTitle,kwNotification,kwValidator} from "./kw/functions.js"

const mainNode = document.getElementById("root");

const menu_handle = function(type,action,key,value) {
    return function(e){
        //添加退出事件!
        if (action == "cancel"){
            notification.close(key);
            return;
        }
        switch(type){
            case 'exit':
                if (action == "exit"){
                    loginForm();
                }
            break;
            case 'setting':
                if (action == "submit"){
                    console.log(key);
                }
            break;
            case 'profile':
                if (action == "submit"){
                    console.log(key);
                }
            break;
        }
        notification.close(key);
    }
}

const loginSuccess = (value) => {
    //登陆成功
    console.log(value);
    message.success('登陆成功!');
    $.getJSON("./mock/config.json",function(j){
        ReactDOM.render(<MainUI config={j} click={clickMain}/>,mainNode);
    }.bind(this));
}

const loginForm = () => {
    //登陆窗口
    ReactDOM.render(<LoginForm success={loginSuccess} check={kwValidator} />,mainNode);
}

const clickMain = (type,e) => {
    if (type == "icon"){
        var rts = {};
        switch (e.target.title) {
          case "home":
            rts = {
                kw:!0, //true,在Main层执行;false,往下传递
                activeKey:"home"
            }
            break;
          case "trigger":
            rts = {
                kw:!1,
                collapsed:e.target.children[0].className.indexOf("unfold") < 0
            }
            break;
          default:
            // statements_def
            break;
        }
        return rts;
      }else if (type == "user"){
        const key = "notification_"+e.key;
        switch (e.key) {
            case "exit":
                kwNotification("退出平台","logout",'是否确定？',key,(
                <ButtonGroup>
                    <Button onClick={menu_handle('exit','exit',key)}>
                    确定
                    </Button>
                    <Button onClick={menu_handle('exit','cancel',key)}>
                    取消
                    </Button>
                </ButtonGroup>
                ));
            break;
            case "edit_password":
                kwNotification("修改密码","setting",<EditPassword nkey={key} handle={menu_handle} />,key);
            break;
            case "user_profile":
                kwNotification("用户资料","profile",<UserProfile nkey={key} handle={menu_handle} />,key);
            break;
            default:
                console.log(e.key);
            break;
        }
      }
}

localforage.getItem("Token",function(err, value){
    if (!err){
        // loginSuccess();
        loginForm();

        // localforage.setItem("Token","1",function(err, value){
        //     console.log(value);
        // });
    }
});

