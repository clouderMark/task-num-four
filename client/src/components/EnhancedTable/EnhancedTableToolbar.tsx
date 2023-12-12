import {useSelector} from 'react-redux';
import {IconButton, Toolbar, Tooltip, Typography} from '@mui/material';
import {Delete as DeleteIcon, Autorenew as AutorenewIcon} from '@mui/icons-material/';
import {alpha} from '@mui/material/styles';
import {selectTable, setChangeStatus, setDeleteItems} from '../../redux/tableSlice';
import {useAppDispatch} from '../../redux/hooks';

const EnhancedTableToolbar = () => {
  const numSelected = useSelector(selectTable).selected.length;
  const statusSelected = useSelector(selectTable).statuses.length;
  const dispatch = useAppDispatch();

  const handleDeleteClick = () => {
    dispatch(setDeleteItems(true));
  };

  const handleChangeClick = () => {
    dispatch(setChangeStatus(true));
  };

  return (
    <Toolbar
      sx={{
        pl: {sm: 2},
        pr: {xs: 1, sm: 1},
        ...((numSelected > 0 || statusSelected > 0) && {
          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      {numSelected > 0 || statusSelected > 0 ? (
        <Typography sx={{flex: '1 1 100%', ml: 3}} color="inherit" variant="subtitle1" component="div">
          {numSelected > 0 ? numSelected : statusSelected} selected
        </Typography>
      ) : (
        <Typography sx={{flex: '1 1 100%', ml: 3}} variant="h6" id="tableTitle" component="div">
          Users
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete" sx={{mr: 3}}>
          <IconButton onClick={handleDeleteClick}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : statusSelected > 0 ? (
        <Tooltip title="Change status" sx={{mr: 3}}>
          <IconButton onClick={handleChangeClick}>
            <AutorenewIcon />
          </IconButton>
        </Tooltip>
      ) : null}
    </Toolbar>
  );
};

export default EnhancedTableToolbar;
