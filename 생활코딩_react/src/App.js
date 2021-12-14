import React, { Component } from 'react';
import TOC from './components/TOC';
import ReadContent from './components/ReadContent';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';
import Subject from './components/Subject';
import Control from './components/Control';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.max_content_id = 3; // ui에 영향이 없는 값은 state에 안넣어도됨.
    this.state = {
      mode: 'welcome',
      selected_content_id: 2,
      subject: { title: 'WEB', sub: 'World Wide Web!' },
      welcome: { title: 'Welcome', desc: 'Hello, React!!' },
      contents: [
        { id: 1, title: 'HTML', desc: 'HTML is for information' },
        { id: 2, title: 'CSS', desc: 'CSS is for design' },
        { id: 3, title: 'JavaScript', desc: 'JavaScript is for interactive' },
      ],
    };
  } // component 초기화
  getReadContent() {
    var i = 0;
    while (i < this.state.contents.length) {
      var data = this.state.contents[i];
      if (data.id === this.state.selected_content_id) {
        return data;
        break;
      }
      i++;
    }
  }
  getContent() {
    var _title,
      _desc,
      _article = null;
    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
    } else if (this.state.mode === 'read') {
      var _content = this.getReadContent();
      _article = (
        <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
      );
    } else if (this.state.mode === 'create') {
      _article = (
        <CreateContent
          onSubmit={function (_title, _desc) {
            // add content to this.state.contents
            this.max_content_id = this.max_content_id + 1;
            // this.state.contents.push(
            //   {id:this.max_content_id, title:_title, desc:_desc}
            // ); //push를 하게 되면 원본 자체가 갱신됨
            // var _contents =this.state.contents.concat(
            //   {id:this.max_content_id, title:_title, desc:_desc}
            // ); // concat하여 변수에 저장시, 원본은 그대로이고, 변수에 복제하여 추가값까지 저장함
            var newContents = Array.from(this.state.contents); // Array.from()을 이용하면 복제함. 단 원본과는 별개로 인식됨 // 객체에서는 Object.assign({추가할객체},복사할객체)
            newContents.push({
              id: this.max_content_id,
              title: _title,
              desc: _desc,
            });
            console.log(_title, _desc);
            this.setState({
              contents: newContents,
              selected_content_id: this.max_content_id,
              mode: 'read',
            });
          }.bind(this)}
        ></CreateContent>
      );
    } else if (this.state.mode === 'update') {
      _content = this.getReadContent();
      _article = (
        <UpdateContent
          data={_content}
          onSubmit={function (_id, _title, _desc) {
            var newContents = Array.from(this.state.contents);
            var i = 0;
            while (i < newContents.length) {
              if (newContents[i].id === _id) {
                newContents[i] = { id: _id, title: _title, desc: _desc };
                break;
              }
              i++;
            }
            this.setState({
              contents: newContents,
              mode: 'read',
            });
          }.bind(this)}
        ></UpdateContent>
      );
    }
    return _article;
  }
  render() {
    console.log('App render');
    console.log('render', this); // this 는 component를 가리킴
    return (
      <div className="App">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={function () {
            this.setState({ mode: 'welcome' }); //리액트는 state 설정시 setState로 해야 된다고 함
          }.bind(this)}
        ></Subject>
        <TOC
          onChangePage={function (id) {
            this.setState({
              mode: 'read',
              selected_content_id: Number(id), //강제 숫자로 만들기
            });
          }.bind(this)}
          data={this.state.contents}
        ></TOC>
        <Control
          onChangeMode={function (_mode) {
            if (_mode === 'delete') {
              if (window.confirm('really?')) {
                var _contents = Array.from(this.state.contents);
                var i = 0;
                while (i < this.state.contents.length) {
                  if (_contents[i].id === this.state.selected_content_id) {
                    _contents.splice(i, 1); // i값 부터 1개 삭제
                    break;
                  }
                  i++;
                }
                this.setState({
                  mode: 'welcome',
                  contents: _contents,
                });
                alert('deleted!!');
              }
            } else {
              this.setState({
                mode: _mode,
              });
            }
          }.bind(this)}
        ></Control>
        {this.getContent()}
      </div>
    );
  }
}

export default App;
