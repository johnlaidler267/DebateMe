import ReactDOM from 'react-dom';
import CloseIcon from '@mui/icons-material/Close';

export default function Modal({ open, children, onClose, color }) {
    const CloseStyle = {
        position: "absolute",
        top: 10,
        right: 20,
        color: "black",
        cursor: "pointer"
    }

    const ModalStyle = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '1rem',
        backgroundColor: '#EBEBEB',
        padding: '50px',
        fontSize: "25px",
        fontWeight: "bold",
        zIndex: 1000,
    }
    
    const OverlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, .7)',
        zIndex: 1000   
    }
    
    if (!open) return null;
    return ReactDOM.createPortal(
        <>
            <div style={OverlayStyle} onClick={onClose}>
                <div style={ModalStyle} onClick={e => e.stopPropagation()}>
                    <div style={CloseStyle} onClick={onClose}><CloseIcon /></div>
                    {children}
                </div>
            </div>
        </>,
        document.getElementById('portal')
  )
}