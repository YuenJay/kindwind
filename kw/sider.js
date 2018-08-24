import {iconTitle} from "./kw/functions.js"
//https://github.com/YuenJay/kindwind 

export class LeftSider extends React.Component{
  constructor(props) {
      super(props);
  }
  state = {collapsed:!0, menu:[], sub:[], iconbar:[], title:"JayUI@Ant.Design", current:''}; 

  componentWillUpdate(nextProps, nextState){
    if (nextProps.config != this.props.config){
      this.props.config = nextProps.config;
      this.setState({
        menu:this.props.config,
        mainCurrent:this.props.config[0].key,
        sub:this.props.config[0].sub,
        title:this.props.config[0].text
      });
    }
    if (nextProps.iconbar != this.props.iconbar){
      this.props.iconbar = nextProps.iconbar;
      this.setState({
        iconbar:this.props.iconbar
      });
    }
    if (nextProps.active != this.props.active){
      let s = nextProps.active.split("|");
      this.setState({
        subCurrent:nextProps.active,
        mainCurrent:s[0],
        sub:this.state.menu.filter(mm=>mm.key==s[0])[0].sub
      });

       this.props.active = nextProps.active;
    }
  }

  clickMainMenu = (e) => {
    if (e.key == this.state.mainCurrent) return;
    this.setState({
      collapsed: !0,
      mainCurrent:e.key,
      title:e.item.props.children[1].props.children,
      sub:this.state.menu.filter(mm=>mm.key==e.key)[0].sub
    });
  }
  clickSubMenu = (e) => {
    this.setState({
      subCurrent:e.key
    });
    this.props.selectPage(e);
  }
  clickIconBar = (k) =>{
    this.setState(this.props.clickIcon(k));
  }

  initSubMenu = (ma) =>{
    return (
      <SubMenu title={iconTitle(ma.icon,ma.text)} key={ma.key} style={{color:'#369'}}>
        {ma.children.map(mc=>this.initSubMenuItem(mc))}
      </SubMenu>
    );
  }
  initSubMenuItem = (mm) => {
      return <Menu.Item key={this.state.mainCurrent+"|"+mm.key}><Popover placement="top" content={mm.content} title={mm.text} trigger="hover" mouseEnterDelay="0.3"><span><Icon type={mm.icon} />{mm.text}</span></Popover></Menu.Item>
  }
  initMenuItem = (mm) => {
    return <Menu.Item key={mm.key}><Icon type={mm.icon} /><span>{mm.text}</span></Menu.Item>
  }
  initIconBar = (mm) => {
    return <Tooltip placement="right" title={mm.text}><Button type="dashed" shape="square" icon={mm.icon} title={mm.key} onClick={this.clickIconBar} /></Tooltip>
  }
  render() {
    return (
      <Sider trigger={null} collapsible width='280'>
        <Sider
        trigger={null}
        collapsible
        width='280'
        collapsed={this.state.collapsed}
        style={{position:'absolute',left:0,height:'100%',zIndex:900,marginLeft:0}}
        id="menu">
        <Menu 
          theme="dark" 
          mode="inline" 
          onClick={this.clickMainMenu}
          selectedKeys={[this.state.mainCurrent]}>
            {this.state.menu.map(mm => this.initMenuItem(mm))}
        </Menu>
        </Sider>
        <Sider 
        style={{marginLeft:80,borderLeft:'2px solid #FFF',height:'100%',background:'#E5E8EE'}}
        id="submenu">
        <Menu 
          theme="light"
          mode="inline" 
          selectedKeys={[this.state.subCurrent]}
          onClick={this.clickSubMenu}
        >
        <MenuItemGroup title={this.state.title}>
          {this.state.sub.map(mm =>(mm.children?this.initSubMenu(mm):this.initSubMenuItem(mm)))}
        </MenuItemGroup>
        </Menu>
        </Sider>
        <Footer id="iconBar"> 
           <Tooltip placement="right" title={this.state.collapsed ? '展开主菜单' : '收起主菜单'}>
           <Button type="dashed" shape="square" icon={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} title='trigger' onClick={this.clickIconBar} />
           </Tooltip>
           {this.state.iconbar.map(mm=>this.initIconBar(mm))}
        </Footer>
      </Sider>
  )}
}