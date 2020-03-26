import React, {Component} from 'react';
import './App.css';
import {Layout, Header, Navigation, Drawer,Textfield, Content} from 'react-mdl';
import Main from './components/main';
import {Link} from 'react-router-dom';


class App extends Component {
  render() {
    return(
    <div style={{height: '300px', position: 'relative'}}>
    <Layout fixedHeader fixedDrawer>
        <Header className= "header-color" title="Covid-19 App" scroll>
           <Textfield
                value=""
                onChange={() => {}}
                label="Search"
                expandable
                expandableIcon="search"
            />
        </Header>
        <Drawer title="Title">
            <Navigation>
                <a href="#">Link</a>
                <a href="#">Link</a>
                <a href="#">Link</a>
                <a href="#">Link</a>
            </Navigation>
        </Drawer>
        <Main/>
        <Content />
    </Layout>
</div>
    )}}

export default Main;
