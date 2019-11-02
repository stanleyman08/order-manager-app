import React from "react";

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

class TabPanel extends React.Component {

    render() {
        const { children, value, index } = this.props;
        return (
            <Typography
                component="div"
                role="tabpanel"
                hidden={value != index}
            >
                <Box p={3}>{children}</Box>
            </Typography>
        )
    }
}

export default TabPanel
