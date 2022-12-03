import styled from "styled-components";

const inputStySearch = `
    height: 45px;
    width: 28vw;
    font-size: 16px;
    padding-left: 18px;
    border-top-left-radius: 1.25rem;
    border-bottom-left-radius: 1.25rem;
    border: none;

    &:focus, &:active {
        outline: none;
    }
`

const inputStyModal = `
    margin: 5px;
    font-size: 18px !important;
    padding-left: 10px;
    min-height: 40px; 
    min-width: 330px;
    border-radius: 0.2rem !important;
`

const InputStyle = props => {
    switch (props.sty) {
        case 'search':
            return inputStySearch;
        case 'modal':
            return inputStyModal;
        default:
            return inputStyModal;
    }
}

export const Input = styled.input`
    ${InputStyle};
    background-color: ${props => props.bg};
    color: ${props => props.color};
`