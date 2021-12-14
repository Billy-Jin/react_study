import React, { Component } from 'react';

class TOC extends Component {
  shouldComponentUpdate(newProps, newState) {
    //render이전에 실행됨
    console.log(
      '====>TOC render shouldComponentUpdate',
      newProps.data, // 현재 새로 받은 데이터, 첫번째 인자로 들어옴
      this.props.data, // 이전 데이터
    );
    if (this.props.data === newProps.data) {
      return false; //리턴 값여부에 따라 render실행여부가 결정됨
    }
    return true;
  }
  render() {
    console.log('====>TOC render');
    var lists = [];
    var data = this.props.data;
    var i = 0;
    while (i < data.length) {
      lists.push(
        <li key={data[i].id}>
          <a
            href={'/content/' + data[i].id}
            data-id={data[i].id} // e.target의 dataset 이름 지정 data-id -> data.id
            onClick={function (e) {
              e.preventDefault();
              this.props.onChangePage(e.target.dataset.id);
              // evente 실행시 e.target은 현재 클릭한 태그를 가리킴.
            }.bind(this)}
          >
            {data[i].title}
          </a>
          {/* <a
                      href={"/content/"+data[i].id}
                      data-id={data[i].id} // e.target의 dataset 속성 이름 지정 data-id -> data.id
                      onClick = {function(id ,number , e) { //bind에서 전달한 값 id = data[i].id , number = 10
                        // console.log(number);  
                        e.preventDefault();
                         this.props.onChangePage(id);
                         // evente 실행시 e.target은 현재 클릭한 태그를 가리킴.
                      }.bind(this, data[i].id, 10)} 
                      //bind뒤의 두번째 인자 부터는 함수의 입력값으로 전달 가능함 , 추가 할 떄마다 e 앞에 순차적으로 추가하면됨.
                      >{data[i].title}</a> */}
        </li>,
      ); //배열로 만들어 줄때는 key값이 필수이다.
      i = i + 1;
    }
    return (
      <nav>
        <ul>{lists}</ul>
      </nav>
    );
  }
}

export default TOC;
