import {useSelector} from 'react-redux';
import {IconButton, Toolbar, Tooltip, Typography} from '@mui/material';
import {Delete as DeleteIcon} from '@mui/icons-material/';
import {alpha} from '@mui/material/styles';
import {selectTable, setDeleteItems} from '../../redux/tableSlice';
import {useAppDispatch} from '../../redux/hooks';

const EnhancedTableToolbar = () => {
  const numSelected = useSelector(selectTable).selected.length;
  const dispatch = useAppDispatch();

  const handleDeleteClick = () => {
    dispatch(setDeleteItems(true));
  };

  return (
    <Toolbar
      sx={{
        pl: {sm: 2},
        pr: {xs: 1, sm: 1},
        ...(numSelected > 0 && {
          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{flex: '1 1 100%', ml: 3}} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
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
      ) : null}
    </Toolbar>
  );
};

export default EnhancedTableToolbar;
