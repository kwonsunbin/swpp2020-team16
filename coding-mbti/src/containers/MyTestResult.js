import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import PeopleIcon from '@material-ui/icons/People';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import BarSingleDiagram from '../components/BarSingleDiagram';
import RadarDiagram from '../components/RadarDiagram';
import TypeInfo from '../components/TypeInfo';

const styles = (theme) => ({
  imageIcon: {
    height: '24px',
    width: '24px',
  },
  iconRoot: {
    textAlign: 'center',
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '1vw',
    backgroundColor: '#3f51b5',
    color: 'white',
    fontSize: '1vw',
    height: '20vh',
    width: '20vh',
    margin: '1vw',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, .1)',
    },
    cursor: 'default',
  },
  box: {
    padding: '1vw',
    color: 'black',
    fontSize: '2vw',
    height: '30vw',
    width: '30vw',
    margin: '1vw',
    cursor: 'default',
    align: 'center',
    alignItems: 'center',
  },
  total: {
    marginBottom: '4vw',
  },
});

class MyTestResult extends Component {
  render() {
    const { classes, report } = this.props;

    if (report.myReport.solutions.length === 0) {
      window.location.href = '../../';
    }
    const myReport = this.props.report.myReport.report;

    const umPrediction = myReport.UM_prediction;
    const tiPrediction = myReport.TI_prediction;
    const rtPrediction = myReport.RT_prediction;
    const jcPrediction = myReport.JC_prediction;

    const myStyleStr = myReport.style_str;

    let uProb;
    let mProb;
    let t1Prob;
    let iProb;
    let rProb;
    let t2Prob;
    let jProb;
    let cProb;
    if (umPrediction === 1) {
      uProb = myReport.UM_probability;
      mProb = 1 - uProb;
    } else {
      mProb = myReport.UM_probability;
      uProb = 1 - uProb;
    }

    if (tiPrediction === 1) {
      t1Prob = myReport.TI_probability;
      iProb = 1 - t1Prob;
    } else {
      iProb = myReport.TI_probability;
      t1Prob = 1 - iProb;
    }

    if (rtPrediction === 1) {
      rProb = myReport.RT_probability;
      t2Prob = 1 - rProb;
    } else {
      t2Prob = myReport.RT_probability;
      rProb = 1 - t2Prob;
    }

    if (jcPrediction === 1) {
      jProb = myReport.JC_probability;
      cProb = 1 - jProb;
    } else {
      cProb = myReport.JC_probability;
      jProb = 1 - cProb;
    }

    return (
      <>
        <Grid container spacing={6} className={classes.total}>
          <Grid item xs={12}>
            <Typography
              component="h1"
              variant="h1"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Analysis Result
            </Typography>
          </Grid>
          <Grid container spacing={4} justify="center">
            <Grid item xs={2} />
            <Grid item xs={4}>
              <Paper className={classes.box}>
                <TypeInfo type={myStyleStr} />
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper className={classes.box}>
                <RadarDiagram
                  analysisData={[
                    uProb * 100,
                    cProb * 100,
                    t1Prob * 100,
                    rProb * 100,
                    mProb * 100,
                    jProb * 100,
                    iProb * 100,
                    t2Prob * 100,
                  ]}
                />
              </Paper>
            </Grid>
            <Grid item xs={2} />
          </Grid>
          <Grid item xs={12}>
            <Typography
              component="h2"
              variant="h3"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Thorough Analysis Based On Each Measure
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Paper>
              <Grid container>
                <Grid item xs={12}>
                  <Typography
                    component="h3"
                    variant="subtitle1"
                    align="center"
                    color="textSecondary"
                    paragraph
                    gutterBottom
                  >
                    User Friendly VS Machine Efficiency
                  </Typography>
                </Grid>
                <Grid container spacing={4} justify="center">
                  <Grid item xl={12} md={5}>
                    <BarSingleDiagram
                      measures={{
                        one: {
                          name: 'User Friendly',
                          data: [uProb * 100],
                        },
                        another: {
                          name: 'Machine Efficiency',
                          data: [mProb * 100],
                        },
                      }}
                      color={0}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper>
              <Grid container>
                <Grid item xs={12}>
                  <Typography
                    component="h2"
                    variant="subtitle1"
                    align="center"
                    color="textSecondary"
                    paragraph
                    gutterBottom
                  >
                    Carefully Typed VS Just Typed
                  </Typography>
                </Grid>
                <Grid container spacing={4} justify="center">
                  <Grid item xl={12} md={5}>
                    <BarSingleDiagram
                      measures={{
                        one: {
                          name: 'Carefully Typed',
                          data: [cProb * 100],
                        },
                        another: {
                          name: 'Just Typed',
                          data: [jProb * 100],
                        },
                      }}
                      color={1}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper>
              <Grid container>
                <Grid item xs={12}>
                  <Typography
                    component="h2"
                    variant="subtitle1"
                    align="center"
                    color="textSecondary"
                    paragraph
                    gutterBottom
                  >
                    Time Complexity VS Intuitive Code
                  </Typography>
                </Grid>
                <Grid container spacing={4} justify="center">
                  <Grid item xl={12} md={5}>
                    <BarSingleDiagram
                      measures={{
                        one: {
                          name: 'Time Complexity',
                          data: [t1Prob * 100],
                        },
                        another: {
                          name: 'Intuitive Code',
                          data: [iProb * 100],
                        },
                      }}
                      color={2}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper>
              <Grid container>
                <Grid item xs={12} align="center">
                  <Typography
                    component="h2"
                    variant="subtitle1"
                    align="center"
                    color="textSecondary"
                    paragraph
                    gutterBottom
                  >
                    Rabbit VS Turtle
                  </Typography>
                </Grid>
                <Grid container spacing={4} justify="center">
                  <Grid item xl={12} md={5}>
                    <BarSingleDiagram
                      measures={{
                        one: {
                          name: 'Rabbit',
                          data: [rProb * 100],
                        },
                        another: {
                          name: 'Turtle',
                          data: [t2Prob * 100],
                        },
                      }}
                      color={3}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <>
            <Grid container spacing={2} align="center">
              <Grid item xs={2} />
              <Grid item xs={2}>
                <Paper
                  elevation={3}
                  variant="contained"
                  className={classes.root}
                  color="primary"
                  onClick={() => {
                    window.location.href = '../../../check/result/1/';
                  }}
                >
                  Check other solutions by style for problem 1
                  <ZoomInIcon className="bt" fontSize="large" />
                </Paper>
              </Grid>
              <Grid item xs={2}>
                <Paper
                  elevation={3}
                  className={classes.root}
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    window.location.href = '../../../check/result/2/';
                  }}
                >
                  Check other solutions by style for problem 2
                  <ZoomInIcon className="bt" fontSize="large" />
                </Paper>
              </Grid>
              <Grid item xs={2}>
                <Paper
                  elevation={3}
                  className={classes.root}
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    window.location.href = '../../../check/result/3/';
                  }}
                >
                  Check other solutions by style for problem 3
                  <ZoomInIcon className="bt" fontSize="large" />
                </Paper>
              </Grid>
              <Grid item xs={2}>
                <Paper
                  className={classes.root}
                  elevation={3}
                  variant="contained"
                  color="primary"
                  align="center"
                  onClick={() => {
                    window.location.href = '../../../relation/';
                  }}
                >
                  Check similar or opposite style coder&apos;s report import
                  <PeopleIcon className="bt" style={{ fontSize: 60 }} />
                </Paper>
              </Grid>
              <Grid xs={2} className="check" />
            </Grid>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Button variant="contained" color="secondary">
                  Share!
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary">
                  Explore!
                </Button>
              </Grid>
            </Grid>
          </>
        </Grid>
      </>
    );
  }
}

MyTestResult.propTypes = {
  classes: PropTypes.object.isRequired,
  solution: PropTypes.object.isRequired,
  report: PropTypes.object.isRequired,
};

const mapDispatchToProps = (state) => ({
  report: state.report.reportReducer,
});

export default connect(
  mapDispatchToProps,
  {}
)(withStyles(styles)(MyTestResult));
