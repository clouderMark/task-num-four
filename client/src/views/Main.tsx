import {useEffect} from 'react';
import {Container} from '@mui/material';
import {useSelector} from 'react-redux';
import {
  useChangeUsersStatusMutation,
  useCheckUserMutation,
  useDeleteUsersMutation,
  useGetAllUsersMutation,
} from '../redux/userApi';
import {selectUser} from '../redux/userSlice';
import EnhancedTable from '../components/EnhancedTable/EnhancedTable';
import {useAppDispatch} from '../redux/hooks';
import {showAlert} from '../redux/alertSlice';
import {
  selectTable,
  setChangeStatus,
  setDeleteItems,
  setRows,
  setSelected,
  setSelectedStatus,
} from '../redux/tableSlice';

const Main = () => {
  const dispatch = useAppDispatch();
  const {token} = useSelector(selectUser);
  const {isDelete, selected, statuses, isChange} = useSelector(selectTable);
  const [getData, {data, isError, error}] = useGetAllUsersMutation();
  const [deleteUsers, {isSuccess: isDeleteSuccess}] = useDeleteUsersMutation();
  const [changeStatuses, {isSuccess: isChangeSuccess}] = useChangeUsersStatusMutation();
  const [checkUser] = useCheckUserMutation();

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
      deleteUsers({token, id: selected});
    }
  }, [isDelete]);

  useEffect(() => {
    if (token && isChange) {
      changeStatuses({token, id: statuses});
    }
  }, [isChange]);

  useEffect(() => {
    if (isChangeSuccess) {
      dispatch(setSelectedStatus([]));
      dispatch(setChangeStatus(false));
      if (token) {
        checkUser(token);
      }
    }
  }, [isChangeSuccess]);

  useEffect(() => {
    if (isDeleteSuccess) {
      dispatch(setSelected([]));
      dispatch(setDeleteItems(false));
      if (token) {
        checkUser(token);
      }
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
