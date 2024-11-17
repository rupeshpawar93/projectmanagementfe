'use strict'
import { useFetchAPI } from '../utilities/customHook';
import { Input, Button } from '../reuseable-component';

const SearchProjectBar = (props) => {
    const FetchAPI = useFetchAPI();
    const { searchProject, projectDetail, setProjectDetail } = props;
    console.log("------SearchProjectBar---props", props);
    const handleSearch = async (e) => {
        e.preventDefault();
        searchProject();
    }

    return (<form class="d-flex" onSubmit={handleSearch}>
        <Input type="text" set={setProjectDetail} min="2" class="form-control mr-sm-2" placeholder="Search" aria-label="Search" name="projectDetail" value={projectDetail} placeholder="Search here..."/>
    </form>)
}

export default SearchProjectBar;