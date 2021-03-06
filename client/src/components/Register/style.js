export default (theme) => { 
    return {
    root: {
        flexGrow: 1,
    },
    leftSide: {
        backgroundColor: "#efefef",
        height: "100vh",
        

    },
    rightSide: {
        height: "100vh",
        [theme.breakpoints.up("sm")]:
        {
        padding: "80px"
        },
        [theme.breakpoints.down("sm")]:
        {
        padding: "0",
        textAlign: "center"
        }
    },
    input: {
        width: "100%",
        maxWidth: "400px"
    },
    logo: {

        maxWidth: "200px",
        marginBottom: "30px"

    }
}
}