import iconTitle from "./kw/functions.js"

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
          this.props.success(values);
      }
    });
  }
  validator = (type,required) =>{
      return function(rule, value, callback, source, options) {
            var errors = this.props.check(type,value,required);
            callback(errors);
     }.bind(this)
  };


  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [
                {validator:this.validator('username',!0)}
            ]
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="帐户名" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [
                {validator:this.validator('password',!0)}
            ]
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>记住密码</Checkbox>
          )}
          <a className="login-form-forgot" href="">忘记密码</a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登陆
          </Button>
          没有帐号，<a href="">立马注册!</a>
        </FormItem>
      </Form>
    );
  }
}

const MyForm = Form.create()(NormalLoginForm);

class LoginForm extends React.Component {

    render(){
        return (
            <Layout id="login">
                <h2 class="login-title">帐户密码登录</h2>
                <MyForm check={this.props.check} success={this.props.success} />
            </Layout>
        )
    }
}

exports.LoginForm = LoginForm;
