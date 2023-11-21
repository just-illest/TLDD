import { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Paper, CardActionArea, CardMedia, TableContainer, Table, TableBody, TableHead, TableRow, TableCell, Button, CircularProgress, List } from "@material-ui/core";
import { DropzoneArea } from 'material-ui-dropzone';
import { common } from '@material-ui/core/colors';
import Clear from '@material-ui/icons/Clear';
import axios from 'axios';



const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(common.white),
    backgroundColor: common.white,
    '&:hover': {
      backgroundColor: '#ffffff7a',
    },
  },
}))(Button);
// const axios = require("axios").default;

const useStyles = makeStyles((theme) => ({
  clearButton: {
    width : "100%",
    color: "#05386B",
    fontSize: "20px",
    fontWeight: 900,
    backgroundColor: '#5CDB95',
    borderRadius: 0,
  },
  root: {
    maxWidth: 345,
    flexGrow: 1,
  },
  media: {
    height: 400,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  
  imageCard: {
    height: 500,
    backgroundColor: 'transparent',
    borderRadius: 0,
  },
  imageCardEmpty: {
    height: 'auto'
  },
  noImage: {
    margin: "auto",
    width: 400,
    height: "400 !important",
  },
  input: {
    display: 'none',
  },
  uploadIcon: {
    background: 'white',
  },
  tableContainer: {
    backgroundColor: '#5CDB95',
    boxShadow: 'none !important',
  },
  table: {
    backgroundColor: '#5CDB95',
  },
  tableHead: {
    backgroundColor: 'transparent !important',
  },
  tableRow: {
    backgroundColor: 'transparent !important',
  },
  tableCell: {
    fontSize: '22px',
    backgroundColor: 'transparent !important',
    borderColor: 'transparent !important',
    color:'#05386B',
  },
  tableCell1: {
    fontSize: '14px',
    backgroundColor: 'transparent !important',
    borderColor: 'transparent !important',
    color:'#05386B',
  },
  tableBody: {
    backgroundColor: 'transparent !important',
  },
  text: {
    color: 'white !important',
    textAlign: 'center',
  },
  detail: {
    backgroundColor: '#5CDB95',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 0,
  },
  loader: {
    color: '#be6a77 !important',
  }
}));
export const ImageUpload = () => {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [data, setData] = useState();
  const [image, setImage] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  let confidence = 0;

  const sendFile = async () => {
    if (image) {
      let formData = new FormData();
      formData.append("file", selectedFile);
      let res = await axios({
        method: "post",
        // url: "process.env.REACT_APP_API_URL",
        url: "http://localhost:8000/predict",
        data: formData,
      });
      if (res.status === 200) {
        setData(res.data);
      }
      setIsloading(false);
    }
  }

  const clearData = () => {
    setData(null);
    setImage(false);
    setSelectedFile(null);
    setPreview(null);
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
  }, [selectedFile]);

  useEffect(() => {
    if (!preview) {
      return;
    }
    setIsloading(true);
    sendFile();
  }, [preview]);

  const onSelectFile = (files) => {
    if (!files || files.length === 0) {
      setSelectedFile(undefined);
      setImage(false);
      setData(undefined);
      return;
    }
    setSelectedFile(files[0]);
    setData(undefined);
    setImage(true);
  };

  if (data) {
    confidence = (parseFloat(data.confidence) * 100).toFixed(2);
  }

  return (
    <>
      <Container maxWidth={false} className="bg-slate h-screen w-screen font-helvetica" disableGutters={true}>
        <div className="flex ">
          <div className="flex flex-col
          bg-slate  
          px-20 h-[768px]">
            <div className=" w-full ">
              <Card className={`${classes.imageCard} ${!image ? classes.imageCardEmpty : ''}`}>
                {image && <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={preview}
                    component="image"
                    title="Contemplative Reptile"
                  />
                </CardActionArea>
                }
                {!image && <>
                  <CardContent className="bg-slate border-2 border-neutral rounded-none w-[90vw]">
                    <DropzoneArea
                      acceptedFiles={['image/*']}
                      dropzoneText={"Drag and drop an image of a tomato plant"}
                      onChange={onSelectFile}
                    />
                  </CardContent>
                  <div className="text-xl text-neutral mt-20">
                    To get the <u>best</u> result, adhere to the following:
                    <List>
                      <li>- Take a picture of a single leaf</li>
                      <li>- Make sure leaf is properly lit</li>
                      <li>- Make sure leaf is properly lit</li>
                    </List>
                  </div>
                  </>
                }
                {data && <CardContent className={classes.detail}>
                  <TableContainer component={Paper} className={classes.tableContainer}>
                    <Table className={classes.table} size="small" aria-label="simple table">
                      <TableHead className={classes.tableHead}>
                        <TableRow className={classes.tableRow}>
                          <TableCell className={classes.tableCell1}>Label:</TableCell>
                          <TableCell align="right" className={classes.tableCell1}>Confidence:</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody className={classes.tableBody}>
                        <TableRow className={classes.tableRow}>
                          <TableCell component="th" scope="row" className={classes.tableCell}>
                            {data.class}
                          </TableCell>
                          <TableCell align="right" className={classes.tableCell}>{confidence}%</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>}
                {isLoading && <CardContent className={classes.detail}>
                  <CircularProgress color="secondary" className={classes.loader} />
                  <Typography className={classes.title} variant="h6" noWrap>
                    Processing
                  </Typography>
                </CardContent>}
              </Card>
            </div>
            {data &&
              <div className=" pt-4" >
                <ColorButton variant="contained" className={classes.clearButton} color="primary" component="span" size="large" onClick={clearData} startIcon={<Clear fontSize="large" />}>
                  Clear
                </ColorButton>
              </div>}
          </div>
          {data &&
            <div className="flex-row pr-20 space-y-2 h-full w-full  font-helvetica text-neutral text-8xl"> 
              <div>{data.class}</div> 
              <div className="text-xl"> What is bacterial spot?  Bacterial spot of tomato 
              is a potentially devastating disease that, in severe cases, can lead to 
              unmarketable fruit and even plant death.  Bacterial spot can occur wherever 
              tomatoes are grown, but is found most frequently in warm, wet climates, as 
              well as in greenhouses.</div>
            </div>
          }
        </div>
      </Container >
    </>
  );
};
