import styled from "styled-components";

const btnStySearch = `
    height: 45px;
    width: 50px;
    border-top-right-radius: 1.25rem;
    border-bottom-right-radius: 1.25rem;
    border: none;
`

const btnStyModal = `
    font-size: 20px;
    padding: 8px;
    min-height: 40px; 
    min-width: 330px;
    border-radius: 0.25rem;
`
const ButtonStyle = props => {
    switch (props.sty) {
        case 'search':
            return btnStySearch;
        case 'modal':
            return btnStyModal;
        default:
            return btnStyModal;
    }
}

export const Button = styled.button`
    ${ButtonStyle};
    background-color: ${props => props.bg};
    color: ${props => props.color};
`