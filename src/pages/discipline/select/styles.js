import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    buttonWhite:{        
        color:  '#FFF'
    },
    input: {
        flex:1
    },
    button: {
        display: 'block',
        marginTop: theme.spacing(2),
    },
    formControl: {
        flex:1,
        flexDirection:'row',
        margin: theme.spacing(5),
        minWidth: 120,
    },  
    topPad: {
        paddingTop: theme.spacing(3)
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
}));

export default useStyles