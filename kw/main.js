import {iconTitle} from "./kw/functions.js"
import {JayHeader} from './kw/header.js';
import {LeftSider} from './kw/sider.js';


class MainUI extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
        collapsed:!0,
        gobal:{},
        menu:[],
        sider:[],
        activeKey:"home",
        tabs:[{
          "closable":false,
          "icon":"desktop",
          "text":"控制台",
          "key":"home"
        }],
        tabKey:'home',
        iconbar:[]
      };
  }
  componentDidMount() {
      this.setState(this.props.config);
      _.import("./page/home.js","home_page");
  }

  click = (type) =>{
    return function(e) {
      let s = this.props.click(type,e);
      if (s && s.kw){
        this.setState(s);return;
      }
      return s;
   }.bind(this)
  };

  selectPage = (e) => {
    let s = !1;
    this.state.tabs.map(mm => {
      if(mm.key == e.key){
        s = !0;
      }
    })
    if (s==!0){
      this.setState({
        subCurrent:e.key,
        activeKey:e.key
      })
    }else{
      this.state.tabs.push({
        "closable":true,
        "icon":e.item.props.children.props.children.props.children[0].props.type,
        "text":e.item.props.children.props.children.props.children[1],
        "key":e.key
      })
      this.setState({
        subCurrent:e.key,
        activeKey:e.key
      });

      setTimeout(function(){
        _.import("./page/%1.js".format(e.key.replaceAll("_","/").replaceAll("|","/")),e.key+'_page');
      },100)
    }
  }
  onChange = (activeKey) => {
    this.setState({ activeKey });
    if (activeKey!="home"){
      this.setState({tabKey:activeKey});      
    }
  }

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  }

  remove = (targetKey) => {
    let activeKey = this.state.activeKey;
    let lastIndex;
    this.state.tabs.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    this.state.tabs = this.state.tabs.filter(pane => pane.key !== targetKey);
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = this.state.tabs[lastIndex].key;
    }
    this.onChange(activeKey);
  }
  initTabs = (mm) => {
    return (
      <TabPane tab={iconTitle(mm.icon,mm.text)} key={mm.key} closable={mm.closable}>
        <div id={mm.key+'_page'} class='page'>
          <Spin spinning='true'  size="large" style={{marginTop:200}} />
        </div>
      </TabPane>
    )
  }
  render() {
    return (
      <Layout style={{height:'100%'}}>
        <JayHeader config={this.state.gobal} menu={this.state.menu} click={this.click("user")}/>
        <Layout style={{height:'100%',background:'#fff'}}>
              <LeftSider config={this.state.sider} active={this.state.tabKey} iconbar={this.state.iconbar} selectPage={this.selectPage} clickIcon={this.click("icon")} />
              <Tabs
                onChange={this.onChange}
                activeKey={this.state.activeKey}
                type="editable-card"
                onEdit={this.onEdit}
                onTabClick={this.onTabClick}
                hideAdd="true"
                style={{background:"#FFF",width:'100%'}}
              >
                {this.state.tabs.map(mm =>this.initTabs(mm))}
              </Tabs>
          </Layout>
      </Layout>
    );
  }
}

exports.MainUI = MainUI;
