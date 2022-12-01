import React from "react";
import { HeaderText, Header, TM } from "./TitleElements";

// make a title for top of the web page
const Title = () => {
    return (
        <Header>
            <HeaderText>DebateMe<sup><TM>TM</TM></sup></HeaderText>
        </Header>
    );
};

export default Title;