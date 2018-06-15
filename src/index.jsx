import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import store from './store/store.js'
import css from './index.scss'

@observer
class Test extends Component {
  onChange = (e) => {
    store.setStr(e.target.value)
  }
  onChangeBox = (e) => {
    let state = e.target.checked
    store.setArr(state, e.target.value)
  }
  onChangeV = (e) => {
    console.log(e.target.id, e.target.value)
    store.setObj(e.target.id, e.target.value)
  }
  setChecked(item) {
    return store.arr.some((_item) => {
      return item == _item
    })
  }
  del = () => {
    store.setMap(0, 'name')
  }
  add = () => {
    store.setMap(1, 'Name', 'xiaohong')
  }
  render() {
    let arr = [1,2,3,4,5,6]
    return (
      <div>
        <div className={css.box}>
          <p>@computed:</p>
          {store.print}
        </div>
        <div className={css.box}>
          String:
          <p>{store.getStr()}</p>
          <p><input type="text" value={store.str} onChange={this.onChange}/></p>
        </div>
        <div className={css.box}>
          Array:
          <p>{store.getArr()}</p>
          <div>
            {
              arr.map((item, index) => {
                return (
                  <label key={index + ''} style={{marginRight: 10}}>
                  <input type="checkbox" onChange={this.onChangeBox} value={item} checked = {this.setChecked(item)}/>
                  {item}
                  </label>
                )
              })
            }
          </div>
        </div>
        <div className={css.box}>
          Object:
          <p>{store.getObj()}</p>
          <div>name：<input type="text" value={store.obj.name} id='name' onChange={this.onChangeV} /></div>
          <div>city：<input type="text" value={store.obj.city} id='city' onChange={this.onChangeV} /></div>
        </div>
        <div className={css.box}>
          Map:
          <p>{JSON.stringify(store.getMap())}</p>
          <div>
            <button onClick={this.del}>删除name</button>
            <button onClick={this.add}>恢复name</button>
          </div>
        </div>
        <br/>
      </div>
    )
  }
}

ReactDOM.render(<Test/>, document.getElementById('root'));