class EditPassword extends React.Component{
	render(){
	    const { getFieldDecorator } = this.props.form;
	    const nkey = this.props.nkey;
		return (
	        <Form onSubmit={(e)=>{
	            e.preventDefault();
	            this.props.form.validateFields((err, values) => {
	              if (!err) {
	                  this.props.handle('setting','submit',nkey,values)(e);
	              }
	            });
	        }}>
	        <FormItem>
	          {getFieldDecorator('oldpassword', {
	            rules: [
	                { required: true ,message:' '}
	            ]
	          })(
	            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="现密码" />
	          )}
	        </FormItem>
	        <FormItem>
	          {getFieldDecorator('newpassword', {
	            rules: [
	                { required: true ,message:' '}
	            ]
	          })(
	            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="新密码" />
	          )}
	        </FormItem>
	        <FormItem>
	          {getFieldDecorator('renewpassword', {
	            rules: [
	                { required: true ,message:' '}
	            ]
	          })(
	            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="重复新密码" />
	          )}
	        </FormItem>
	        <FormItem>
	            <ButtonGroup>
	                <Button htmlType="submit">
	                确定
	                </Button>
	                <Button onClick={this.props.handle('setting','cancel',nkey)}>
	                取消
	                </Button>
	            </ButtonGroup>
	        </FormItem>
	        </Form>
		)
	}
}

class UserProfile extends React.Component{
	render(){
	    const { getFieldDecorator } = this.props.form;
	    const nkey = this.props.nkey;
		return ( 
            <Form  onSubmit={(e)=>{
                e.preventDefault();
                this.props.form.validateFields((err, values) => {
                  if (!err) {
	                  this.props.handle('profile','submit',nkey,values)(e);
                  }
                });
            }}>
            <FormItem>
                <ButtonGroup>
                    <Button htmlType="submit">
                    确定
                    </Button>
                    <Button onClick={this.props.handle('profile','cancel',nkey)}>
                    取消
                    </Button>
                </ButtonGroup>
            </FormItem>
            </Form>
		)
	}
}

exports.EditPassword = Form.create()(EditPassword);
exports.UserProfile = Form.create()(UserProfile);



