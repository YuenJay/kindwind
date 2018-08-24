import {iconTitle} from "./kw/functions.js"

//https://github.com/YuenJay/kindwind 


export class JayHeader extends React.Component{
  constructor(props) {
      super(props);
  }
  state = {
    menu:<Menu></Menu>, title:"KindWind@Ant.Design", user:"Coder.Jay"
  };

  componentWillUpdate(nextProps, nextState){
    if (nextProps.config != this.props.config){
      this.props = nextProps;
      this.setState({
        user:this.props.config.user,
        title:this.props.config.title,
        menu:(
        <Menu
          theme='dark'
          onClick={this.clickUserMenu}
        >
          {this.props.menu.map(mm => <Menu.Item key={mm.key}><Icon type={mm.icon} />{mm.text}</Menu.Item>)}
        </Menu>
      )});
    }
  }

  clickUserMenu = (e) => {
    this.props.click(e);
  }
  
  render(){
    return (
        <Header id="banner">
            <i className="logo" />
            <span className="jay">
                {this.state.title}
            </span>
            <Dropdown overlay={this.state.menu} >
                <a className="ant-dropdown-link" href="#">
                  <Icon type="user" />{this.state.user} <Icon type="down" />
                </a>
            </Dropdown>
        </Header>
    )
  }
}