class JayTest extends React.Component{
  state = {
    data:[]
  };
  
  componentWillMount(){
    $.getJSON("./mock/data.json",function(result){
      this.setState({
        data:result
      });
    }.bind(this));
  }

 columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a href="javascript:;">{text}</a>,
  }, {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  }, {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  }, {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
      <span>
        {tags.map(tag => <Tag color="blue" key={tag}>{tag}</Tag>)}
      </span>
    ),
  }, {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <a href="javascript:;">Invite {record.name}</a>
        <Divider type="vertical" />
        <Button onClick={this.click({record})}>Delete</Button>
      </span>
    ),
  }];

  click = (e) => {
    return function(e){
        console.log(this);
    }.bind(e);
  }

  render() {
    return (
      <Table columns={this.columns} dataSource={this.state.data} />
    )
  }
}

ReactDOM.render(<JayTest />, mountNode);