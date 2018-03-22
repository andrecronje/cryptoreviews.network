import React, { Component } from 'react';
import CssBaseline from 'material-ui/CssBaseline';
import ButtonAppBar from './components/ButtonAppBar.js'
import Card, { CardActions, CardContent } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import Select from 'material-ui/Select';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText, FormControlLabel, FormGroup } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import { MenuItem } from 'material-ui/Menu';
import NumberFormat from 'react-number-format';

const theme = createMuiTheme({
  palette: {
    primary: {
      dark: '#E91E63',
      contrastText: '#E91E63',
      primaryTextColor: '#E91E63'
    },
  },
});

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      ref={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      thousandSeparator
      prefix=""
    />
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cryptoName: '',
      cryptoNameError: false,
      twitterHandle: '',
      twitterFollowers: '',
      redditHandle: '',
      redditSubscribers: '',
      telegramHandle: '',
      telegramUsers: '',
      telegramUserError: false,
      cryptoSymbol: '',
      alexaRank: '',
      googleTrendsRank: '',
      developmentStage: '',
      developmentStageError: false,
      githubNumberOfRepos: '',
      githubCommitsInMostActiveRepo: '',
      githubContributorosInMostActiveRepo: '',
      githubForksForMostActiveRepo: '',
      githubWatchersForMostActiveRepo: '',
      githubStarsForMostActiveRepo: '',
      category: '',
      marketCapOfCompetitor: '',
      purchasableBy: '',
      tokenPrice: '',
      tokenPriceError: '',
      tokenTotal: '',
      tokenTotalError: '',
      tokenSupply: '',
      tokenSupplyError: '',
      tokenMarketCap: '',
      tokenMarketCapError: '',
      maximumContributionCapped: true,
      kyc: true,
      website: true,
      ownToken: true,
      ownWallet: false,
      teamMembersAbove30Below80: '',
      teamMembersAbove30Error: false,
      teamMembers3recommendations: '',
      teamMembers3recommendationsError: false,
      teamMembersAbove80: '',
      teamMembersAbove80Error: false,
      teamMembers5recommendations: '',
      teamMembers5recommendationsError: false,
      advisorsAbove30Below80: '',
      advisorsAbove30Below80Error: false,
      advisorsAbove80: '',
      advisorsAbove80Error: false,
      advisors3recommendations: '',
      advisors3recommendationsError: false,
      advisors5recommendations: '',
      advisors5recommendationsError: false,
      ideaSectorDisruption: '',
      ideaSectorDisruptionError: false,
      ideaAdoptionPotential: '',
      ideaAdoptionPotentialError: false,
      ideaMarketSasturation: '',
      ideaMarketSasturationError: false,
      ideaCompetitors: '',
      ideaCompetitorsError: false,
      ideaInnovation: '',
      ideaInnovationError: false,
      websiteURL: '',
      websiteURLError: false,
      control: false,
    };

    this.submit = this.submit.bind(this);
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  handleChecked = name => event => {
    this.setState({ [name]: event.target.checked });
  };
  submit() {
    if (this.state.cryptoName=='') {
      this.setState({ cryptoNameError: true });
    }
    if (this.state.websiteURLError=='') {
      this.setState({ websiteURLError: true });
    }
    if (this.state.telegramUsers=='') {
      this.setState({ telegramUsersError: true });
    }
    if (this.state.developmentStage=='') {
      this.setState({ developmentStageError: true });
    }
    if (this.state.tokenPrice=='') {
      this.setState({ tokenPriceError: true });
    }
    if (this.state.tokenTotal=='') {
      this.setState({ tokenTotalError: true });
    }
    if (this.state.tokenSupply=='') {
      this.setState({ tokenSupplyError: true });
    }
    if (this.state.tokenMarketCap=='') {
      this.setState({ tokenMarketCapError: true });
    }
    if (this.state.ideaSectorDisruption=='') {
      this.setState({ ideaSectorDisruptionError: true });
    }
    if (this.state.ideaAdoptionPotential=='') {
      this.setState({ ideaAdoptionPotentialError: true });
    }
    if (this.state.ideaMarketSasturation=='') {
      this.setState({ ideaMarketSasturationError: true });
    }
    if (this.state.ideaCompetitors=='') {
      this.setState({ ideaCompetitorsError: true });
    }
    if (this.state.ideaInnovation=='') {
      this.setState({ ideaInnovationError: true });
    }
    if (this.state.teamMembersAbove80=='') {
      this.setState({ teamMembersAbove80Error: true });
    }
    if (this.state.teamMembersAbove30Below80=='') {
      this.setState({ teamMembersAbove30Below80Error: true });
    }
    if (this.state.teamMembers3recommendations=='') {
      this.setState({ teamMembers3recommendationsError: true });
    }
    if (this.state.teamMembers5recommendations=='') {
      this.setState({ teamMembers5recommendationsError: true });
    }
    if (this.state.advisorsAbove80=='') {
      this.setState({ advisorsAbove80Error: true });
    }
    if (this.state.advisorsAbove30Below80=='') {
      this.setState({ advisorsAbove30Below80Error: true });
    }
    if (this.state.advisors3recommendations=='') {
      this.setState({ advisors3recommendationsError: true });
    }
    if (this.state.advisors5recommendations=='') {
      this.setState({ advisors5recommendationsError: true });
    }
  };

  render() {
    var style = {}
    var size = 6
    if (this.state.control) {
      style = {display:'none'}
      size = 12
    }
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App" style={{background:'#8566de',height:'50vh'}}>
          <CssBaseline />
          <Grid container justify="center" alignItems="flex-start" direction="row" spacing={8}>
            <Grid item xs={12}>
              <Card raised elevation={10} square={false} style={{margin:100}} fullWidth={true}>
                <CardContent>
                  <Grid container xs={12} direction="row" justify="center">
                    <Grid item xs={12} sm={6}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={this.state.control}
                            onChange={this.handleChecked('control')}
                            value="control"
                          />
                        }
                        label="Do you want to fine tune the results or do you want to let the robot do all the work?"
                      />
                    </Grid>
                    <Grid container xs={12} alignItems="flex-start" spacing={16}>
                      <Grid item xs={12} lg={4}>
                        <Grid container xs={12} direction="row" alignItems="flex-start" justify="center">
                          <Grid item xs={12}><Typography align='center' variant="headline" component="h2" style={{color:'#E91E63'}}>Cryptocurrency</Typography></Grid>
                          <Grid item xs={size} >
                            <TextField required fullWidth={true} color="textSecondary" error={this.state.cryptoNameError}
                              id="cryptoName" label="Crypto Name" value={this.state.cryptoName}
                              onChange={this.handleChange('cryptoName')} margin="normal"/>
                          </Grid>
                          <Grid item style={style} xs={6}>
                            <TextField fullWidth={true}
                              id="cryptoSymbol" label="Crypto Symbol" value={this.state.cryptoSymbol}
                              onChange={this.handleChange('cryptoSymbol')} margin="normal"
                              helperText="Trading symbol for the crypto"/>
                          </Grid>
                          <Grid item xs={12}>
                            <TextField fullWidth={true} required error={this.state.websiteURLError}
                              id="websiteURL" label="Website URL" value={this.state.websiteURL}
                              onChange={this.handleChange('websiteURL')} margin="normal"/>
                          </Grid>
                          <Grid item xd={12}><Typography align='center' color="textSecondary" variant="headline" component="h2" style={{color:'#E91E63'}}>Development</Typography></Grid>
                          <Grid item xs={12} >
                            <FormControl fullWidth={true} required error={this.state.developmentStageError}>
                              <InputLabel htmlFor="developmentStage">Development Stage</InputLabel>
                              <Select

                                value={this.state.developmentStage}
                                onChange={this.handleChange('developmentStage')}
                                inputProps={{
                                  id: 'developmentStage',
                                }}
                              >
                                <MenuItem value={'None'}>None</MenuItem>
                                <MenuItem value={'Whitepaper'}>Whitepaper</MenuItem>
                                <MenuItem value={'Mockup'}>Mockup</MenuItem>
                                <MenuItem value={'Proof of Concept'}>Proof of Concept</MenuItem>
                                <MenuItem value={'Alpha'}>Alpha</MenuItem>
                                <MenuItem value={'Beta'}>Beta</MenuItem>
                                <MenuItem value={'Production'}>Production</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item style={style} xs={4} lg={6}>
                            <TextField fullWidth={true} type={'number'}
                              id="githubNumberOfRepos" label="Repo's" value={this.state.githubNumberOfRepos}
                              onChange={this.handleChange('githubNumberOfRepos')} margin="normal"
                              helperText="Total number of repo's in their github"/>
                          </Grid>
                          <Grid item style={style} xs={4} lg={6}>
                            <TextField fullWidth={true} type={'number'}
                              id="githubCommitsInMostActiveRepo" label="Commits" value={this.state.githubCommitsInMostActiveRepo}
                              onChange={this.handleChange('githubCommitsInMostActiveRepo')} margin="normal"
                              helperText="Amount of commits in most active repo"/>
                          </Grid>
                          <Grid item style={style} xs={4} lg={6}>
                            <TextField fullWidth={true} type={'number'}
                              id="githubContributorosInMostActiveRepo" label="Contributors" value={this.state.githubContributorosInMostActiveRepo}
                              onChange={this.handleChange('githubContributorosInMostActiveRepo')} margin="normal"
                              helperText="Amount of contributors in most active repo"/>
                          </Grid>
                          <Grid item style={style} xs={4} lg={6}>
                            <TextField fullWidth={true} type={'number'}
                              id="githubForksForMostActiveRepo" label="Forks" value={this.state.githubForksForMostActiveRepo}
                              onChange={this.handleChange('githubForksForMostActiveRepo')} margin="normal"
                              helperText="Amount of forks of their most active repo"/>
                          </Grid>
                          <Grid item style={style} xs={4} lg={6}>
                            <TextField fullWidth={true} type={'number'}
                              id="githubWatchersForMostActiveRepo" label="Watchers" value={this.state.githubWatchersForMostActiveRepo}
                              onChange={this.handleChange('githubWatchersForMostActiveRepo')} margin="normal"
                              helperText="Amount of watchers for most active repo"/>
                          </Grid>
                          <Grid item style={style} xs={4} lg={6}>
                            <TextField fullWidth={true} type={'number'}
                              id="githubStarsForMostActiveRepo" label="Stars" value={this.state.githubStarsForMostActiveRepo}
                              onChange={this.handleChange('githubStarsForMostActiveRepo')} margin="normal"
                              helperText="Amount of stars given for most active repo"/>
                          </Grid>
                          <Grid item xs={12} style={style}><Typography align='center' color="textSecondary" variant="headline" component="h2" style={{color:'#E91E63'}}>Features</Typography></Grid>
                          <Grid item style={style} xs={6}>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={this.state.maximumContributionCapped}
                                  onChange={this.handleChange('maximumContributionCapped')}
                                  value="maximumContributionCapped"
                                />
                              }
                              label="Contribution Capped"
                            />
                          </Grid>
                          <Grid item style={style} xs={6}>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={this.state.kyc}
                                  onChange={this.handleChange('kyc')}
                                  value="kyc"
                                />
                              }
                              label="Know Your Customer"
                            />
                          </Grid>
                          <Grid item style={style} xs={6}>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={this.state.ownToken}
                                  onChange={this.handleChange('ownToken')}
                                  value="ownToken"
                                />
                              }
                              label="Creating Own Token"
                            />
                          </Grid>
                          <Grid item style={style} xs={6}>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={this.state.ownWallet}
                                  onChange={this.handleChange('ownWallet')}
                                  value="ownWallet"
                                />
                              }
                              label="Creating Own Wallet"
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} lg={4}>
                        <Grid container xs={12} direction="row" alignItems="flex-start">
                          <Grid item xs={12}><Typography align='center' color="textSecondary" variant="headline" component="h2" style={{color:'#E91E63'}}>Social</Typography></Grid>
                          <Grid item style={style} xs={6}>
                            <TextField fullWidth={true}
                              id="twitterHandle" label="Twitter Handle" value={this.state.twitterHandle}
                              onChange={this.handleChange('twitterHandle')} margin="normal"
                              helperText="The @ name"/>
                          </Grid>
                          <Grid item style={style} xs={6}>
                            <TextField fullWidth={true} type={'number'}
                              id="twitterFollowers" label="Twitter Followers" value={this.state.twitterFollowers}
                              onChange={this.handleChange('twitterFollowers')} margin="normal"
                              helperText="The total number of twitter followers"/>
                          </Grid>
                          <Grid item style={style} xs={6}>
                            <TextField fullWidth={true}
                              id="redditHandle" label="Subreddit Name" value={this.state.redditHandle}
                              onChange={this.handleChange('redditHandle')} margin="normal"
                              helperText="The /r/ subreddit name"/>
                          </Grid>
                          <Grid item style={style} xs={6}>
                            <TextField fullWidth={true} type={'number'}
                              id="redditSubscribers" label="Reddit Subscribers" value={this.state.redditSubscribers}
                              onChange={this.handleChange('redditSubscribers')} margin="normal"
                              helperText="Total number of subreddit subscribers"/>
                          </Grid>
                          <Grid item style={style} xs={6}>
                            <TextField fullWidth={true}
                              id="telegramHandle" label="Telegram Handle" value={this.state.telegramHandle}
                              onChange={this.handleChange('telegramHandle')} margin="normal"
                              helperText="The @ telegram name"/>
                          </Grid>
                          <Grid item xs={size}>
                            <TextField required fullWidth={true} error={this.state.telegramUsersError}
                              id="telegramUsers" label="Telegram Users" value={this.state.telegramUsers}
                              onChange={this.handleChange('telegramUsers')} margin="normal" type={'number'}
                              helperText="Total number of users in telegram"/>
                          </Grid>
                          <Grid item style={style} xs={6}>
                            <TextField fullWidth={true} type={'number'}
                              id="alexaRank" label="Alexa Rank" value={this.state.alexaRank}
                              onChange={this.handleChange('alexaRank')} margin="normal"
                              helperText="The alexa rank click here"/>
                          </Grid>
                          <Grid item style={style} xs={6}>
                            <TextField fullWidth={true} type={'number'}
                              id="googleTrendsRank" label="Google Trend Rank" value={this.state.googleTrendsRank}
                              onChange={this.handleChange('googleTrendsRank')} margin="normal"
                              helperText="The google trends rank click here"/>
                          </Grid>
                          <Grid item xs={12}><Typography align='center' color="textSecondary" variant="headline" component="h2" style={{color:'#E91E63'}}>Team</Typography></Grid>
                          <Grid item xs={6}>
                            <TextField fullWidth required error={this.state.teamMembersAbove30Below80Error}
                              id="teamMembersAbove30Below80" label="30 endorsements" value={this.state.teamMembersAbove30Below80}
                              onChange={this.handleChange('teamMembersAbove30Below80')} margin="normal" type={'number'}
                              helperText="Number of team members with more than 30 but less than 80 endorsements"/>
                          </Grid>
                          <Grid item xs={6}>
                            <TextField fullWidth required error={this.state.teamMembersAbove80Error}
                              id="teamMembersAbove80" label="80 endorsements" value={this.state.teamMembersAbove80}
                              onChange={this.handleChange('teamMembersAbove80')} margin="normal" type={'number'}
                              helperText="Number of team members with more than 80 endorsements"/>
                          </Grid>
                          <Grid item xs={6}>
                            <TextField fullWidth required error={this.state.teamMembers3recommendationsError}
                              id="teamMembers3recommendations" label="3 recommends" value={this.state.teamMembers3recommendations}
                              onChange={this.handleChange('teamMembers3recommendations')} margin="normal" type={'number'}
                              helperText="Number of team members with more than 3 but less than 5 recommendations"/>
                          </Grid>
                          <Grid item xs={6}>
                            <TextField fullWidth required error={this.state.teamMembers5recommendationsError}
                              id="teamMembers5recommendations" label="5 recommends" value={this.state.teamMembers5recommendations}
                              onChange={this.handleChange('teamMembers5recommendations')} margin="normal" type={'number'}
                              helperText="Number of team members with more than 5 recommendations"/>
                          </Grid>
                          <Grid item xs={12}><Typography align='center' color="textSecondary" variant="headline" component="h2" style={{color:'#E91E63'}}>Advisors</Typography></Grid>
                          <Grid item xs={6}>
                            <TextField fullWidth required error={this.state.advisorsAbove30Below80Error}
                              id="advisorsAbove30Below80" label="30 endorsements" value={this.state.advisorsAbove30Below80}
                              onChange={this.handleChange('advisorsAbove30Below80')} margin="normal" type={'number'}
                              helperText="Number of advisors with more than 30 but less than 80 endorsements"/>
                          </Grid>
                          <Grid item xs={6}>
                            <TextField fullWidth required error={this.state.advisorsAbove80Error}
                              id="advisorsAbove80" label="80 endorsements" value={this.state.advisorsAbove80}
                              onChange={this.handleChange('advisorsAbove80')} margin="normal" type={'number'}
                              helperText="Number of advisors with more than 80 endorsements"/>
                          </Grid>
                          <Grid item xs={6}>
                            <TextField fullWidth required error={this.state.advisors3recommendationsError}
                              id="advisors3recommendations" label="3 recommends" value={this.state.advisors3recommendations}
                              onChange={this.handleChange('advisors3recommendations')} margin="normal" type={'number'}
                              helperText="Number of advisors with more than 3 recommendations"/>
                          </Grid>
                          <Grid item xs={6}>
                            <TextField fullWidth required error={this.state.advisors5recommendationsError}
                              id="advisors5recommendations" label="5 recommends" value={this.state.advisors5recommendations}
                              onChange={this.handleChange('advisors5recommendations')} margin="normal" type={'number'}
                              helperText="Number of advisors with more than 5 recommendations"/>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} lg={4}>
                        <Grid container xs={12} direction="row" alignItems="flex-start">
                          <Grid item xs={12}><Typography align='center' color="textSecondary" variant="headline" component="h2" style={{color:'#E91E63'}}>Token</Typography></Grid>
                          <Grid item style={style} xs={12}>
                            <FormControl fullWidth={true}>
                              <InputLabel htmlFor="category">Category</InputLabel>
                              <Select
                                value={this.state.category}
                                onChange={this.handleChange('category')}
                                inputProps={{
                                  id: 'category',
                                }}
                              >
                                <MenuItem value={'Finance'}>Finance</MenuItem>
                                <MenuItem value={'Data Control'}>Data Control</MenuItem>
                                <MenuItem value={'AI'}>AI</MenuItem>
                                <MenuItem value={'Security'}>Security</MenuItem>
                                <MenuItem value={'Trading'}>Trading</MenuItem>
                                <MenuItem value={'Social Media'}>Social Media</MenuItem>
                                <MenuItem value={'IoT'}>IoT</MenuItem>
                                <MenuItem value={'Big Data'}>Big Data</MenuItem>
                                <MenuItem value={'Gaming'}>Gaming</MenuItem>
                                <MenuItem value={'Information'}>Information</MenuItem>
                                <MenuItem value={'Education'}>Education</MenuItem>
                                <MenuItem value={'Other'}>Other</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item style={style} xs={12}>
                            <FormControl fullWidth={true}>
                              <InputLabel htmlFor="purchasableBy">Purchasable</InputLabel>
                              <Select
                                value={this.state.purchasableBy}
                                onChange={this.handleChange('purchasableBy')}
                                inputProps={{
                                  id: 'purchasableBy',
                                }}
                              >
                                <MenuItem value={'ETH'}>ETH</MenuItem>
                                <MenuItem value={'BTC'}>BTC</MenuItem>
                                <MenuItem value={'NEO'}>NEO</MenuItem>
                                <MenuItem value={'STRAT'}>STRAT</MenuItem>
                                <MenuItem value={'Other'}>Other</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={6}>
                            <TextField required fullWidth={true} error={this.state.tokenTotalError}
                              id="tokenTotal" label="Token Total" value={this.state.tokenTotal}
                              onChange={this.handleChange('tokenTotal')} margin="normal"
                              InputProps={{inputComponent: NumberFormatCustom,}}
                              helperText="Total amount of tokens created"/>
                          </Grid>
                          <Grid item xs={6}>
                            <TextField required fullWidth={true} error={this.state.tokenSupplyError}
                              id="tokenSupply" label="Token Supply" value={this.state.tokenSupply}
                              onChange={this.handleChange('tokenSupply')} margin="normal"
                              InputProps={{inputComponent: NumberFormatCustom,}}
                              helperText="Tokens made available for sale"/>
                          </Grid>
                          <Grid item xs={6}>
                            <FormControl fullWidth={true} required error={this.state.tokenPriceError}>
                              <InputLabel htmlFor="tokenPrice">Token Price</InputLabel>
                              <Input
                                id="tokenPrice"
                                value={this.state.tokenPrice}
                                onChange={this.handleChange('tokenPrice')}
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                inputComponent={NumberFormatCustom}
                              />
                            </FormControl>
                          </Grid>
                          <Grid item xs={6}>
                            <FormControl fullWidth={true} required error={this.state.tokenMarketCapError}>
                              <InputLabel htmlFor="tokenMarketCap">Marketcap</InputLabel>
                              <Input
                                id="tokenMarketCap"
                                value={this.state.tokenMarketCap}
                                onChange={this.handleChange('tokenMarketCap')}
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                inputComponent={NumberFormatCustom}
                              />
                            </FormControl>
                          </Grid>
                          <Grid item xs={12}><Typography align='center' color="textSecondary" variant="headline" component="h2" style={{color:'#E91E63'}}>Idea</Typography></Grid>
                          <Grid item xs={6}>
                            <FormControl fullWidth={true} error={this.state.ideaSectorDisruptionError} required>
                              <InputLabel htmlFor="ideaSectorDisruption">Sector Disruption</InputLabel>
                              <Select
                                value={this.state.ideaSectorDisruption}
                                onChange={this.handleChange('ideaSectorDisruption')}
                                inputProps={{
                                  id: 'ideaSectorDisruption',
                                }}
                              >
                                <MenuItem value={'Low'}>Low</MenuItem>
                                <MenuItem value={'Medium'}>Medium</MenuItem>
                                <MenuItem value={'High'}>High</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={6}>
                            <FormControl fullWidth={true} error={this.state.ideaAdoptionPotentialError} required>
                              <InputLabel htmlFor="ideaAdoptionPotential">Adoption Potential</InputLabel>
                              <Select
                                value={this.state.ideaAdoptionPotential}
                                onChange={this.handleChange('ideaAdoptionPotential')}
                                inputProps={{
                                  id: 'ideaAdoptionPotential',
                                }}
                              >
                                <MenuItem value={'Low'}>Low</MenuItem>
                                <MenuItem value={'Medium'}>Medium</MenuItem>
                                <MenuItem value={'High'}>High</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={6}>
                            <FormControl fullWidth={true} error={this.state.ideaMarketSasturationError} required>
                              <InputLabel htmlFor="ideaMarketSasturation">Market Saturation</InputLabel>
                              <Select
                                value={this.state.ideaMarketSasturation}
                                onChange={this.handleChange('ideaMarketSasturation')}
                                inputProps={{
                                  id: 'ideaMarketSasturation',
                                }}
                              >
                                <MenuItem value={'Low'}>Low</MenuItem>
                                <MenuItem value={'Medium'}>Medium</MenuItem>
                                <MenuItem value={'High'}>High</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={6}>
                            <FormControl fullWidth={true} error={this.state.ideaCompetitorsError} required>
                              <InputLabel htmlFor="ideaCompetitors">Competitors</InputLabel>
                              <Select
                                value={this.state.ideaCompetitors}
                                onChange={this.handleChange('ideaCompetitors')}
                                inputProps={{
                                  id: 'ideaCompetitors',
                                }}
                              >
                                <MenuItem value={'Low'}>Low</MenuItem>
                                <MenuItem value={'Medium'}>Medium</MenuItem>
                                <MenuItem value={'High'}>High</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={6}>
                            <FormControl fullWidth={true} error={this.state.ideaInnovationError} required>
                              <InputLabel htmlFor="ideaInnovation">Innovation</InputLabel>
                              <Select
                                value={this.state.ideaInnovation}
                                onChange={this.handleChange('ideaInnovation')}
                                inputProps={{
                                  id: 'ideaInnovation',
                                }}
                              >
                                <MenuItem value={'Low'}>Low</MenuItem>
                                <MenuItem value={'Medium'}>Medium</MenuItem>
                                <MenuItem value={'High'}>High</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container xs={12} direction="row" justify="flex-end">
                    <Button size="large" variant="raised" color="secondary" onClick={this.submit}>
                      Predict
                    </Button>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
