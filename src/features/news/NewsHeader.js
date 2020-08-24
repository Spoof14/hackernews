import React, { PureComponent } from "react"
import { Link } from "../../components/link/Link"
import styles from './News.module.scss';


// simple class component for rendering the page header with a link to the page and a search bar
export default class NewsHeader extends PureComponent {
    constructor(props) {
      super(props)
    
      this.state = {
         search:''
      }
    }
    
      onChange = (e) => {
        this.setState({search:e.target.value})
      }
    
      onSubmit = (e) => {
        e.preventDefault()
        this.props.search(this.state.search)
      }
    
      render(){
        return <div className={styles.row + ' ' + styles.newsHeader}>
        <h1><Link url={'/'}>HackerNews</Link></h1>
        <form onSubmit={this.onSubmit}>
          <input type="text" placeholder="search" value={this.state.search} onChange={this.onChange} ></input>
          <input type="submit" value="search" onSubmit={this.onSubmit} />
        </form>
      </div>
      }
    }