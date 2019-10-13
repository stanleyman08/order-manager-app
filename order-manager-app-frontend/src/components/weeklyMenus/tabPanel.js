import React from "react";

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

class TabPanel extends React.Component {

    render() {
        const { children } = this.props;
        return (
            <Typography
                component="div"
                role="tabpanel"
            >
                <Box p={3}>{children}</Box>
            </Typography>
        )
    }
}

export default TabPanel
