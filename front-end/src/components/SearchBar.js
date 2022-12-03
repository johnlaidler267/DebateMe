import { Input } from '../styles/Input.style';
import { Button } from '../styles/Button.style';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar({ placeholder }) {
  return (
    <>
      <form className='d-inline-block' style={{ margin: "14px 0px 0px 180px" }} >
        <div className='d-flex justify-content-center'>
            <Input type="search" name="search" sty="search" bg="#e8e8e8" placeholder={placeholder} />
            <Button type="submit" bg="#e8e8e8" sty="search">
              <SearchIcon sx={{ color: 'black', marginBottom: '40px' }} />
            </Button>
        </div>
      </form>
    </>
  )
}