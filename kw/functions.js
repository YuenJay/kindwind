notification.config({
	top:36,
});
export const iconTitle = function(icon,text){
  return <span><Icon type={icon} /><span>{text}</span></span>
}

export const kwNotification =(title,icon,description,key,btn) =>{
    var config = {
        message: title,
        icon: <Icon type={icon} style={{ color: '#108ee9' }} />,
        description:description,
        duration:0,
        key:key
    };
    if (btn) config.btn = btn; 
    notification.open(config);
}

export const kwValidator = (type,value,required) =>{
    if (required && value == ""){
        return "必填项";
    }
    var res = {
        "username":{
            "regExp":/^[A-Za-z]{4,16}$/,
            "message":"长度:4-16，类型:大小写字母"
        },
        "password":{
            "regExp":/^[\S]{6,16}$/,
            "message":"长度:6-16，类型:任意字符"
        }
    };
    if (!res[type].regExp.test(value)){
        return res[type].message;
    }
    return [];
}