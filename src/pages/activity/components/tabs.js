import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import ActivitiesDetails from '../details/index';
import AlunosAtividade from '../alunosatividade/index';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

export default function TabsActivities(props) {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div>
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                <Tab label="Detalhes da atividade" />
                <Tab label="Alunos ligados a atividade" />
            </Tabs>
            <TabPanel value={value} index={0}>
                <ActivitiesDetails atividadeDetails={props?.location?.state}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <AlunosAtividade />
            </TabPanel>
        </div>
    );
}