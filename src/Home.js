import React,{Component} from "react";

export class Home extends Component{
    render(){
        return(
            <div>    
                <h5>Sometimes it take around 10s to get reply from Web Api for first time later it work well</h5> 
                <h5>Routing on netlify don't work like i expected</h5>                                       
                To make this site i used:<br></br>
                ASP.NET 6.0 WEB API<br></br>
                Entity Framework 6.0<br></br>
                SqLite<br></br>
                Swagger<br></br>
                And hosted it on Azure<br></br>
                <a href="https://barteksqlite.azurewebsites.net/swagger/index.html">Link to Web Api</a><br></br>
                For Frontend i used ReactJS and Bootstrap<br></br>
                <img src="meme.webp" alt="tinder swindler meme"></img>
            </div>
        )
    }
}