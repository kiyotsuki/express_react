import React, { Component } from 'react';
import { HashRouter, Route, Switch, Link } from 'react-router-dom';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

export default class CharaStatus extends Component {
    
    constructor(){
        super();
        this.state = { openStatusDialog:false, baseStatus:[], imageURL:'image/player.png' };
    }

    componentDidMount() {
    }

    onChangeBaseState(name, value, add = false){
        var baseStatus = [...this.state.baseStatus];
        baseStatus[name + (add?'_add':'_base')] = value;
        this.setState({baseStatus});
    }

    getBaseState(name, text=false){
        var baseStatus = this.state.baseStatus;
        var base = baseStatus[name + '_base'];
        var add = baseStatus[name + '_add'];
        
        if(base == undefined) return text ? '--' : 0;
        var ret = Number(base);
        if(add != undefined) ret += Number(add);

        if(ret > 99 || ret < -9) return ret;
        return text ? ('0' + ret).slice(-2) : ret;
    }

    dice(num, max){
        var ret = 0;
        for(var i=0;i<num;i++){
            ret += Math.floor(Math.random() * (max-1)) + 1;
        }
        return ret;
    }
    
    render() {
        const { baseStatus, openStatusDialog, imageURL } = this.state;

        const status=[ 'STR', 'CON', 'POW', 'DEX', 'APP', 'SIZ', 'INT', 'EDU' ];

        var valueText = "HP:--, MP:--, SAN:--";
        var skillText = "アイデア:--, 幸運:--, 知識:--";

        return (<div>
            <TextField floatingLabelText='参考画像' value={imageURL} onChange={(event, value)=>{ this.setState({imageURL:value}) }} /><br/>
            名前:クトゥルフ 年齢:20 性別:不明 職業:アーティスト<br/>
            <img className='player_image' src={imageURL}/>

            <div className='base_status'>
                〇基礎ステータス<br/>
                <span className='base_state'>STR:{this.getBaseState('STR', true)}</span>
                <span className='base_state'>CON:{this.getBaseState('CON', true)}</span>
                <span className='base_state'>POW:{this.getBaseState('POW', true)}</span>
                <span className='base_state'>DEX:{this.getBaseState('DEX', true)}</span>
                <br/>
                <span className='base_state'>APP:{this.getBaseState('APP', true)}</span>
                <span className='base_state'>SIZ:{this.getBaseState('SIZ', true)}</span>
                <span className='base_state'>INT:{this.getBaseState('INT', true)}</span>
                <span className='base_state'>EDU:{this.getBaseState('EDU', true)}</span>
                <br/><br/>
                〇基礎スキル<br/>
                <span className='base_skill'>アイデア:{this.getBaseState('INT')*5}</span>
                <span className='base_skill'>幸運:{this.getBaseState('POW')*5}</span>
                <span className='base_skill'>知識:{this.getBaseState('EDU')*5}</span>
                <br/><br/>
                〇体力・精神力・正気度<br/>
                <span className='base_skill'>HP:__/{(Math.floor(this.getBaseState('CON') + this.getBaseState('SIZ'))/2)}</span>
                <span className='base_skill'>MP:__/{this.getBaseState('POW')}</span>
                <span className='base_skill'>SAN:__/{this.getBaseState('POW')*5}</span>

                <RaisedButton label='編集' onClick={ ()=>{ this.setState({openStatusDialog:true}) }}/>
            </div>

            <Dialog title='基礎ステータス' open={openStatusDialog} autoScrollBodyContent={true} onRequestClose={()=>{ this.setState({openStatusDialog:false}) }}>

            { status.map((e)=> {
                const style = {
                    width:160,
                    marginLeft:10
                };

                var base = baseStatus[e+'_base'];
                if(base == undefined) base = '';
                var add = baseStatus[e+'_add'];
                if(add == undefined) add = '';
                var total = base ? this.getBaseState(e) : '';
                return (<div key={e}>
                    <TextField style={style} floatingLabelText={e} type='number' value={base} onChange={(event, value)=>{ this.onChangeBaseState(e.name, value) }}/>
                    <TextField style={style} floatingLabelText='加算値' type='number' value={add} onChange={(event, value)=>{ this.onChangeBaseState(e.name, value, true) }}/>
                    <TextField style={style} floatingLabelText='合計値' type='number' value={total} disabled={true}/>
                </div>);
            })}
            <RaisedButton label='ランダム' onClick={()=>{
                var status = [...baseStatus];
                status['STR_base'] = this.dice(3, 6);
                status['CON_base'] = this.dice(3, 6);
                status['POW_base'] = this.dice(3, 6);
                status['DEX_base'] = this.dice(3, 6);
                status['APP_base'] = this.dice(3, 6);
                status['SIZ_base'] = this.dice(2, 6) + 6;
                status['INT_base'] = this.dice(3, 6);
                status['EDU_base'] = this.dice(3, 6) + 3;
                this.setState({baseStatus:status});
            }}/>
            </Dialog>
        </div>);
    }
}