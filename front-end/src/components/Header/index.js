import SearchBar from "../SearchBar";
import { HeaderText, Header, TM } from "./TitleElements";

// make a title for top of the web page
const Title = () => {
    return (
        <Header>
            <HeaderText>
                DebateMe<TM>TM</TM>
                <SearchBar placeholder="Search for topics..." />
            </HeaderText>
        </Header>
    );
};

export default Title;