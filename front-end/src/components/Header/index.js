import React from "react";
import { HeaderText, Header, TM, span } from "./TitleElements";

// make a title for top of the web page
const Title = () => {
    return (
        <Header>
            <HeaderText>Debate<span>Me🗳️</span><sup><TM>TM</TM></sup></HeaderText>
        </Header>
    );
};

export default Title;