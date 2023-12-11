import {useEffect} from 'react';
import {Container} from '@mui/material';
import {useSelector} from 'react-redux';
import {useDeleteUsersMutation, useGetAllUsersMutation} from '../redux/userApi';
import {selectUser} from '../redux/userSlice';
import EnhancedTable from '../components/EnhancedTable/EnhancedTable';
import {useAppDispatch} from '../redux/hooks';
import {showAlert} from '../redux/alertSlice';
import {selectTable, setRows, setSelected} from '../redux/tableSlice';

const Main = () => {
  const dispatch = useAppDispatch();
  const {token} = useSelector(selectUser);
  const {isDelete, selected} = useSelector(selectTable);
  const [getData, {data, isError, error}] = useGetAllUsersMutation();
  const [doDelete, {isSuccess: isDeleteSuccess}] = useDeleteUsersMutation();

  useEffect(() => {
    if (token) {
      getData({token});
    }
  }, [token]);

  useEffect(() => {
    if (data) {
      dispatch(setRows(data));
    }
  }, [data]);

  useEffect(() => {
    if (isError && 'data' in error!) {
      dispatch(showAlert({message: error.data.message, statusCode: error.status}));
    }
  }, [isError]);

  useEffect(() => {
    if (token && isDelete) {
      doDelete({token, id: selected});
    }
  }, [isDelete]);

  useEffect(() => {
    if (isDeleteSuccess) {
      dispatch(setSelected([]));
    }
  }, [isDeleteSuccess]);

  return (
    <>
      {data ? (
        <Container maxWidth={false}>
          <EnhancedTable />
        </Container>
      ) : null}
    </>
  );
};

export default Main;
