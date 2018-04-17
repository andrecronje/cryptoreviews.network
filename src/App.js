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
import { LinearProgress } from 'material-ui/Progress';
import { CircularProgress } from 'material-ui/Progress';
import HelpOutlineIcon from 'material-ui-icons/HelpOutline';
import HelpIcon from 'material-ui-icons/HelpOutline';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
const aes256 = require('aes256');
const bip39 = require('bip39');
const axios = require('axios');
const sha256 = require('sha256');

const instance = axios.create({
  baseURL: 'https://api.cryptoreviews.network/api/v1/',
  headers: {'Authorization': 'Basic RURGRjM5OEZEODYzQTAzRUYzMDRCNjg3RkQ2MzgzODgyMzY2ODM4QkZBN0Q2Njg4QkJFQ0E2NTM3MUMzNkVEOTpDOUQ2QzIwQjNDNTc1RTM1NDVDRjkwMjU0RTIxOUY4RjU2M0ZDQUQ0NjJDRTcwODc5RTA0MzA4MTNDNDVFQTZE'}
});

String.prototype.hexEncode = function(){
    var hex, i;
    var result = "";
    for (i=0; i<this.length; i++) {
        hex = this.charCodeAt(i).toString(16);
        result += ("000"+hex).slice(-4);
    }
    return result
}
String.prototype.hexDecode = function(){
    var j;
    var hexes = this.match(/.{1,4}/g) || [];
    var back = "";
    for(j = 0; j<hexes.length; j++) {
        back += String.fromCharCode(parseInt(hexes[j], 16));
    }

    return back;
}

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
      type: '',
      typeError: false,
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
      loading: false,
      ignoreError: false,
      error: false,
      loaded: false,
      r: {
        cryptoName: '',
        cryptoSymbol: '',
        metric: {
          scorePercentage: 0,
          scorePercentageMVP: 0,
          scorePercentageMax: 0
        }
      },
      errored: false,
      err: ''
    };

    this.submit = this.submit.bind(this);
    this.force = this.force.bind(this);
    this.reset = this.reset.bind(this);
  };
  reset() {
    this.setState({loaded:false})
  };
  handleChange = name => event => {
    console.log(name)
    /*****
    Available for sale * Token total = Token supply
    Token Supply * Token Price = Marketcap
    Token Supply / Token Total = Available for sale
    MarketCap / Token Supply = Token Price
    ****/
    if (name === 'tokenAvailableSale' && this.state.tokenTotal !== '' && this.state.tokenSupply === '') {
      const tokenSupply = ( this.state.tokenTotal * (event.target.value / 100) )
      this.setState({
        tokenSupply : tokenSupply
      })
      if (this.state.tokenPrice !== '' && this.state.tokenMarketCap === '') {
        this.setState({
          tokenMarketCap : ( tokenSupply * this.state.tokenPrice  )
        })
      }
    }
    if (name === 'tokenTotal' && this.state.tokenAvailableSale !== '' && this.state.tokenSupply === '') {
      const tokenSupply = ( event.target.value * (this.state.tokenAvailableSale / 100) )
      this.setState({
        tokenSupply : tokenSupply
      })
    }


    this.setState({
      [name]: event.target.value,
    });
  };
  handleChecked = name => event => {
    this.setState({ [name]: event.target.checked });
  };
  submit() {
    this.setState({loading:true})
    var error = false;
    if (this.state.cryptoName=='') {
      this.setState({ cryptoNameError: true });
      error = true;
    }
    if (this.state.type=='') {
      this.setState({ typeError: true });
      error = true;
    }
    if (this.state.websiteURLError=='') {
      this.setState({ websiteURLError: true });
      error = true;
    }
    if (this.state.telegramUsers=='') {
      this.setState({ telegramUsersError: true });
      error = true;
    }
    if (this.state.developmentStage=='') {
      this.setState({ developmentStageError: true });
      error = true;
    }
    if (this.state.tokenPrice=='') {
      this.setState({ tokenPriceError: true });
      error = true;
    }
    if (this.state.tokenTotal=='') {
      this.setState({ tokenTotalError: true });
      error = true;
    }
    if (this.state.tokenSupply=='') {
      this.setState({ tokenSupplyError: true });
      error = true;
    }
    if (this.state.tokenMarketCap=='') {
      this.setState({ tokenMarketCapError: true });
      error = true;
    }
    if (this.state.ideaSectorDisruption=='') {
      this.setState({ ideaSectorDisruptionError: true });
      error = true;
    }
    if (this.state.ideaAdoptionPotential=='') {
      this.setState({ ideaAdoptionPotentialError: true });
      error = true;
    }
    if (this.state.ideaMarketSasturation=='') {
      this.setState({ ideaMarketSasturationError: true });
      error = true;
    }
    if (this.state.ideaCompetitors=='') {
      this.setState({ ideaCompetitorsError: true });
      error = true;
    }
    if (this.state.ideaInnovation=='') {
      this.setState({ ideaInnovationError: true });
      error = true;
    }
    if (this.state.teamMembersAbove80=='') {
      this.setState({ teamMembersAbove80Error: true });
      error = true;
    }
    if (this.state.teamMembersAbove30Below80=='') {
      this.setState({ teamMembersAbove30Below80Error: true });
      error = true;
    }
    if (this.state.teamMembers3recommendations=='') {
      this.setState({ teamMembers3recommendationsError: true });
      error = true;
    }
    if (this.state.teamMembers5recommendations=='') {
      this.setState({ teamMembers5recommendationsError: true });
      error = true;
    }
    if (this.state.advisorsAbove80=='') {
      this.setState({ advisorsAbove80Error: true });
      error = true;
    }
    if (this.state.advisorsAbove30Below80=='') {
      this.setState({ advisorsAbove30Below80Error: true });
      error = true;
    }
    if (this.state.advisors3recommendations=='') {
      this.setState({ advisors3recommendationsError: true });
      error = true;
    }
    if (this.state.advisors5recommendations=='') {
      this.setState({ advisors5recommendationsError: true });
      error = true;
    }
    if (error) {
      this.setState({loading:false,error:true})
    } else {
      this.force()
    }
  };
  force() {
    this.setState({loading:true})
    const json = JSON.stringify(this.state);
    const mnemonic = bip39.generateMnemonic();
    const encrypted = aes256.encrypt(mnemonic, json);

    const data = {
      e: encrypted.hexEncode(),
      m: mnemonic.hexEncode(),
      u: '19ED40BF62C399B8492EFDA5B9A9184B68CF4D9D4A165B38557B9D14201D0C03',
      p: 'ABD83F6571FA9D495A1301F99A8C8F8C6C7A48C8BEEEA426293BFA77D72C8B81',
      t: new Date().getTime(),
    }
    const seed = JSON.stringify(data)
    const signature = sha256(seed)

    data.s = signature
    var that = this
    instance.post('process', data)
    .then(function (r) {
      const dMnemonic = r.data.data.m.hexDecode()
      const dEncrypted = r.data.data.e.hexDecode()
      const dTime = r.data.data.t
      const dSignature = r.data.data.s

      const sig = {
        e: r.data.data.e,
        m: r.data.data.m,
        t: r.data.data.t
      }
      const dSeed = JSON.stringify(sig)
      const compareSignature = sha256(dSeed)

      if (compareSignature !== dSignature) {
        /* error response here */
      }
      const payload = aes256.decrypt(dMnemonic, dEncrypted)
      var data = null
      try {
         data = JSON.parse(payload)
      } catch (ex) {
        /* could not parse json error */
      }
      that.setState({loading:false, r:data})
      that.setState({loaded:true})
    })
    .catch(function (error) {
      console.log(error)
      that.setState({loading:false,loaded:true,errored:true,err:error})
    });
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
        <div className="App" style={{background:'#8566de',height:'25vh'}}>
          <CssBaseline />
          <Grid container xs={12} justify="center" alignItems="flex-start" direction="row" spacing={8}>
            <Grid item xs={12}><Typography align='center' variant="headline" component="h2" style={{color:'#fff',marginTop:40}}>CryptoReviews Growth Prediction</Typography></Grid>
            <Grid item xs={12}><Typography align='center' variant="headline" component="h2" style={{color:'#fff'}}><a href="https://medium.com/@suchi.blackwing/crypto-growth-model-website-launch-9cc885c8b3b6" style={{color:"white"}}>How this works</a></Typography></Grid>
            <Grid item xs={10}>
              {!this.state.loaded?<Card raised elevation={10} square={false} fullWidth={true}>
                <CardContent>
                  <Grid container xs={12} direction="row" justify="center">
                    <Grid item xs={12} sm={6}>
                      <FormControlLabel disabled={this.state.loading}
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
                            <TextField required fullWidth={true} color="textSecondary" error={this.state.cryptoNameError} disabled={this.state.loading}
                              id="cryptoName" label="Crypto Name" value={this.state.cryptoName}
                              onChange={this.handleChange('cryptoName')} margin="normal"/>
                          </Grid>
                          <Grid item style={style} xs={6}>
                            <TextField fullWidth={true}
                              id="cryptoSymbol" label="Crypto Symbol" value={this.state.cryptoSymbol} disabled={this.state.loading}
                              onChange={this.handleChange('cryptoSymbol')} margin="normal"
                              helperText="Trading symbol for the crypto"/>
                          </Grid>
                          <Grid item xs={12}>
                            <TextField fullWidth={true} required error={this.state.websiteURLError} disabled={this.state.loading}
                              id="websiteURL" label="Website URL" value={this.state.websiteURL}
                              onChange={this.handleChange('websiteURL')} margin="normal"/>
                          </Grid>
                          <Grid item xs={12} >
                            <FormControl fullWidth={true} required error={this.state.typeError} disabled={this.state.loading}>
                              <InputLabel htmlFor="type">Type</InputLabel>
                              <Select

                                value={this.state.type}
                                onChange={this.handleChange('type')}
                                inputProps={{
                                  id: 'type',
                                }}
                              >
                                <MenuItem value={'dApp'}>dApp</MenuItem>
                                <MenuItem value={'Currency'}>Currency</MenuItem>
                                <MenuItem value={'Platform'}>Platform</MenuItem>
                                <MenuItem value={'Protocol'}>Protocol</MenuItem>
                                <MenuItem value={'Infrastructure'}>Infrastructure</MenuItem>
                                <MenuItem value={'Blockchain'}>Blockchain</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xd={12}><Typography align='center' color="textSecondary" variant="headline" component="h2" style={{color:'#E91E63'}}>Development</Typography></Grid>
                          <Grid item xs={12} >
                            <FormControl fullWidth={true} required error={this.state.developmentStageError} disabled={this.state.loading}>
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
                          <Grid item style={style} xs={6} sm={4} lg={6}>
                            <TextField fullWidth={true} type={'number'} disabled={this.state.loading}
                              id="githubNumberOfRepos" label="Repo's" value={this.state.githubNumberOfRepos}
                              onChange={this.handleChange('githubNumberOfRepos')} margin="normal"
                              helperText="Total number of repo's in their github"
                              InputProps={{
                                endAdornment:
                                  <InputAdornment position="end">
                                    <Tooltip
                                      id="tooltip"
                                      title="Go to the teams github.com and count how many repositories they have"
                                      placement="top"
                                    >
                                      <HelpIcon color="disabled" style={{ fontSize: 16 }}/>
                                    </Tooltip>
                                  </InputAdornment>

                              }}/>
                          </Grid>
                          <Grid item style={style} xs={6} sm={4} lg={6}>
                            <TextField fullWidth={true} type={'number'} disabled={this.state.loading}
                              id="githubCommitsInMostActiveRepo" label="Commits" value={this.state.githubCommitsInMostActiveRepo}
                              onChange={this.handleChange('githubCommitsInMostActiveRepo')} margin="normal"
                              helperText="Amount of commits in most active repo"
                              InputProps={{
                                endAdornment:
                                  <InputAdornment position="end">
                                    <Tooltip
                                      id="tooltip"
                                      title="Select the top repo from github and look middle left for the amount of commits"
                                      placement="top"
                                    >
                                      <HelpIcon color="disabled" style={{ fontSize: 16 }}/>
                                    </Tooltip>
                                  </InputAdornment>

                              }}/>
                          </Grid>
                          <Grid item style={style} xs={6} sm={4} lg={6}>
                            <TextField fullWidth={true} type={'number'} disabled={this.state.loading}
                              id="githubContributorosInMostActiveRepo" label="Contributors" value={this.state.githubContributorosInMostActiveRepo}
                              onChange={this.handleChange('githubContributorosInMostActiveRepo')} margin="normal"
                              helperText="Amount of contributors in most active repo"
                              InputProps={{
                                endAdornment:
                                  <InputAdornment position="end">
                                    <Tooltip
                                      id="tooltip"
                                      title="Select the top repo from github and look middle right for the amount of contributors"
                                      placement="top"
                                    >
                                      <HelpIcon color="disabled" style={{ fontSize: 16 }}/>
                                    </Tooltip>
                                  </InputAdornment>

                              }}/>
                          </Grid>
                          <Grid item style={style} xs={6} sm={4} lg={6}>
                            <TextField fullWidth={true} type={'number'} disabled={this.state.loading}
                              id="githubForksForMostActiveRepo" label="Forks" value={this.state.githubForksForMostActiveRepo}
                              onChange={this.handleChange('githubForksForMostActiveRepo')} margin="normal"
                              helperText="Amount of forks of their most active repo"
                              InputProps={{
                                endAdornment:
                                  <InputAdornment position="end">
                                    <Tooltip
                                      id="tooltip"
                                      title="Select the top repo from github and look top right for the fork amount"
                                      placement="top"
                                    >
                                      <HelpIcon color="disabled" style={{ fontSize: 16 }}/>
                                    </Tooltip>
                                  </InputAdornment>

                              }}/>
                          </Grid>
                          <Grid item style={style} xs={6} sm={4} lg={6}>
                            <TextField fullWidth={true} type={'number'} disabled={this.state.loading}
                              id="githubWatchersForMostActiveRepo" label="Watchers" value={this.state.githubWatchersForMostActiveRepo}
                              onChange={this.handleChange('githubWatchersForMostActiveRepo')} margin="normal"
                              helperText="Amount of watchers for most active repo"
                              InputProps={{
                                endAdornment:
                                  <InputAdornment position="end">
                                    <Tooltip
                                      id="tooltip"
                                      title="Select the top repo from github and look top right for the watch amount"
                                      placement="top"
                                    >
                                      <HelpIcon color="disabled" style={{ fontSize: 16 }}/>
                                    </Tooltip>
                                  </InputAdornment>

                              }}/>
                          </Grid>
                          <Grid item style={style} xs={6} sm={4} lg={6}>
                            <TextField fullWidth={true} type={'number'} disabled={this.state.loading}
                              id="githubStarsForMostActiveRepo" label="Stars" value={this.state.githubStarsForMostActiveRepo}
                              onChange={this.handleChange('githubStarsForMostActiveRepo')} margin="normal"
                              helperText="Amount of stars given for most active repo"
                              InputProps={{
                                endAdornment:
                                  <InputAdornment position="end">
                                    <Tooltip
                                      id="tooltip"
                                      title="Select the top repo from github and look top right for the star amount"
                                      placement="top"
                                    >
                                      <HelpIcon color="disabled" style={{ fontSize: 16 }}/>
                                    </Tooltip>
                                  </InputAdornment>
                              }}/>
                          </Grid>
                          <Grid item xs={12} style={style}><Typography align='center' color="textSecondary" variant="headline" component="h2" style={{color:'#E91E63'}}>Features</Typography></Grid>
                          <Grid item style={style} xs={6}>
                            <FormControlLabel disabled={this.state.loading}
                              control={
                                <Switch
                                  checked={this.state.maximumContributionCapped}
                                  onChange={this.handleChecked('maximumContributionCapped')}
                                  value="maximumContributionCapped"
                                />
                              }
                              label="Contribution Capped"
                            />
                          </Grid>
                          <Grid item style={style} xs={6}>
                            <FormControlLabel disabled={this.state.loading}
                              control={
                                <Switch
                                  checked={this.state.kyc}
                                  onChange={this.handleChecked('kyc')}
                                  value="kyc"
                                />
                              }
                              label="Know Your Customer"
                            />
                          </Grid>
                          <Grid item style={style} xs={6}>
                            <FormControlLabel disabled={this.state.loading}
                              control={
                                <Switch
                                  checked={this.state.ownToken}
                                  onChange={this.handleChecked('ownToken')}
                                  value="ownToken"
                                />
                              }
                              label="Creating Own Token"
                            />
                          </Grid>
                          <Grid item style={style} xs={6}>
                            <FormControlLabel disabled={this.state.loading}
                              control={
                                <Switch
                                  checked={this.state.ownWallet}
                                  onChange={this.handleChecked('ownWallet')}
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
                          <Grid item style={style} xs={12} sm={6}>
                            <TextField fullWidth={true} disabled={this.state.loading}
                              id="twitterHandle" label="Twitter Handle" value={this.state.twitterHandle}
                              onChange={this.handleChange('twitterHandle')} margin="normal"
                              helperText="The @ name"
                              InputProps={{
                                endAdornment:
                                  <InputAdornment position="end">
                                    <Tooltip
                                      id="tooltip"
                                      title="Go to their twitter and input their @twitter_name, excluding the @ sign"
                                      placement="top"
                                    >
                                      <HelpIcon color="disabled" style={{ fontSize: 16 }}/>
                                    </Tooltip>
                                  </InputAdornment>
                              }}/>
                          </Grid>
                          <Grid item style={style} xs={12} sm={6}>
                            <TextField fullWidth={true} type={'number'} disabled={this.state.loading}
                              id="twitterFollowers" label="Twitter Followers" value={this.state.twitterFollowers}
                              onChange={this.handleChange('twitterFollowers')} margin="normal"
                              helperText="The total number of twitter followers"
                              InputProps={{
                                endAdornment:
                                  <InputAdornment position="end">
                                    <Tooltip
                                      id="tooltip"
                                      title="Go to their twitter page and input their amount of followers"
                                      placement="top"
                                    >
                                      <HelpIcon color="disabled" style={{ fontSize: 16 }}/>
                                    </Tooltip>
                                  </InputAdornment>
                              }}/>
                          </Grid>
                          <Grid item style={style} xs={12} sm={6}>
                            <TextField fullWidth={true} disabled={this.state.loading}
                              id="redditHandle" label="Subreddit Name" value={this.state.redditHandle}
                              onChange={this.handleChange('redditHandle')} margin="normal"
                              helperText="The /r/ subreddit name"
                              InputProps={{
                                endAdornment:
                                  <InputAdornment position="end">
                                    <Tooltip
                                      id="tooltip"
                                      title="Go to their subreddit and input their /r/subreddit_name, excluding the /r/"
                                      placement="top"
                                    >
                                      <HelpIcon color="disabled" style={{ fontSize: 16 }}/>
                                    </Tooltip>
                                  </InputAdornment>
                              }}/>
                          </Grid>
                          <Grid item style={style} xs={12} sm={6}>
                            <TextField fullWidth={true} type={'number'} disabled={this.state.loading}
                              id="redditSubscribers" label="Reddit Subscribers" value={this.state.redditSubscribers}
                              onChange={this.handleChange('redditSubscribers')} margin="normal"
                              helperText="Total number of subreddit subscribers"
                              InputProps={{
                                endAdornment:
                                  <InputAdornment position="end">
                                    <Tooltip
                                      id="tooltip"
                                      title="Go to their subreddit and input their total number of subscribers"
                                      placement="top"
                                    >
                                      <HelpIcon color="disabled" style={{ fontSize: 16 }}/>
                                    </Tooltip>
                                  </InputAdornment>
                              }}/>
                          </Grid>
                          <Grid item style={style} xs={12} sm={6}>
                            <TextField fullWidth={true} disabled={this.state.loading}
                              id="telegramHandle" label="Telegram Handle" value={this.state.telegramHandle}
                              onChange={this.handleChange('telegramHandle')} margin="normal"
                              helperText="The @ telegram name"
                              InputProps={{
                                endAdornment:
                                  <InputAdornment position="end">
                                    <Tooltip
                                      id="tooltip"
                                      title="Go to their telegram and input their @telegram_name, excluding the @"
                                      placement="top"
                                    >
                                      <HelpIcon color="disabled" style={{ fontSize: 16 }}/>
                                    </Tooltip>
                                  </InputAdornment>
                              }}/>
                          </Grid>
                          <Grid item xs={12} sm={size}>
                            <TextField required fullWidth={true} error={this.state.telegramUsersError} disabled={this.state.loading}
                              id="telegramUsers" label="Telegram Users" value={this.state.telegramUsers}
                              onChange={this.handleChange('telegramUsers')} margin="normal" type={'number'}
                              helperText="Total number of users in telegram"
                              InputProps={{
                                endAdornment:
                                  <InputAdornment position="end">
                                    <Tooltip
                                      id="tooltip"
                                      title="Go to their telegram and input their total members in the channel"
                                      placement="top"
                                    >
                                      <HelpIcon color="disabled" style={{ fontSize: 16 }}/>
                                    </Tooltip>
                                  </InputAdornment>
                              }}/>
                          </Grid>
                          <Grid item style={style} xs={12} sm={6}>
                            <TextField fullWidth={true} type={'number'} disabled={this.state.loading}
                              id="alexaRank" label="Alexa Rank" value={this.state.alexaRank}
                              onChange={this.handleChange('alexaRank')} margin="normal"
                              helperText="The alexa rank"
                              InputProps={{
                                endAdornment:
                                  <InputAdornment position="end">
                                    <Tooltip
                                      id="tooltip"
                                      title="Go to www.alexa.com/siteinfo and search for their website name, the returned rank is the value you are looking for"
                                      placement="top"
                                    >
                                      <HelpIcon color="disabled" style={{ fontSize: 16 }}/>
                                    </Tooltip>
                                  </InputAdornment>
                              }}/>
                          </Grid>
                          <Grid item style={style} xs={12} sm={6}>
                            <TextField fullWidth={true} type={'number'} disabled={this.state.loading}
                              id="googleTrendsRank" label="Google Trend Rank" value={this.state.googleTrendsRank}
                              onChange={this.handleChange('googleTrendsRank')} margin="normal"
                              helperText="The google trends rank"
                              InputProps={{
                                endAdornment:
                                  <InputAdornment position="end">
                                    <Tooltip
                                      id="tooltip"
                                      title="Go to trends.google.com/trends and search for the crypto name, the number on the first graph is what you are looking for"
                                      placement="top"
                                    >
                                      <HelpIcon color="disabled" style={{ fontSize: 16 }}/>
                                    </Tooltip>
                                  </InputAdornment>
                              }}/>
                          </Grid>
                          <Grid item xs={12}><Typography align='center' color="textSecondary" variant="headline" component="h2" style={{color:'#E91E63'}}>Team</Typography></Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField fullWidth required error={this.state.teamMembersAbove30Below80Error} disabled={this.state.loading}
                              id="teamMembersAbove30Below80" label="30 endorsements" value={this.state.teamMembersAbove30Below80}
                              onChange={this.handleChange('teamMembersAbove30Below80')} margin="normal" type={'number'}
                              helperText="Number of team members with more than 30 but less than 80 endorsements"
                              InputProps={{
                                endAdornment:
                                  <InputAdornment position="end">
                                    <Tooltip
                                      id="tooltip"
                                      title="Go to each LinkedIN member scroll down to endorsements, and input 1 for each here if they have more than 30 but less than 80 endorsements"
                                      placement="top"
                                    >
                                      <HelpIcon color="disabled" style={{ fontSize: 16 }}/>
                                    </Tooltip>
                                  </InputAdornment>
                              }}/>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField fullWidth required error={this.state.teamMembersAbove80Error} disabled={this.state.loading}
                              id="teamMembersAbove80" label="80 endorsements" value={this.state.teamMembersAbove80}
                              onChange={this.handleChange('teamMembersAbove80')} margin="normal" type={'number'}
                              helperText="Number of team members with more than 80 endorsements"
                              InputProps={{
                                endAdornment:
                                  <InputAdornment position="end">
                                    <Tooltip
                                      id="tooltip"
                                      title="Go to each LinkedIN member scroll down to endorsements, and input 1 for each here if they have more than 80"
                                      placement="top"
                                    >
                                      <HelpIcon color="disabled" style={{ fontSize: 16 }}/>
                                    </Tooltip>
                                  </InputAdornment>
                              }}/>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField fullWidth required error={this.state.teamMembers3recommendationsError} disabled={this.state.loading}
                              id="teamMembers3recommendations" label="3 recommends" value={this.state.teamMembers3recommendations}
                              onChange={this.handleChange('teamMembers3recommendations')} margin="normal" type={'number'}
                              helperText="Number of team members with more than 3 but less than 5 recommendations"
                              InputProps={{
                                endAdornment:
                                  <InputAdornment position="end">
                                    <Tooltip
                                      id="tooltip"
                                      title="Go to each LinkedIN member scroll down to recommendations, and input 1 here for each member that has more than 3 but less than 5 recommendations"
                                      placement="top"
                                    >
                                      <HelpIcon color="disabled" style={{ fontSize: 16 }}/>
                                    </Tooltip>
                                  </InputAdornment>
                              }}/>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField fullWidth required error={this.state.teamMembers5recommendationsError} disabled={this.state.loading}
                              id="teamMembers5recommendations" label="5 recommends" value={this.state.teamMembers5recommendations}
                              onChange={this.handleChange('teamMembers5recommendations')} margin="normal" type={'number'}
                              helperText="Number of team members with more than 5 recommendations"
                              InputProps={{
                                endAdornment:
                                  <InputAdornment position="end">
                                    <Tooltip
                                      id="tooltip"
                                      title="Go to each LinkedIN member scroll down to recommendations, and input 1 here for each member that has more than 5 recommendations"
                                      placement="top"
                                    >
                                      <HelpIcon color="disabled" style={{ fontSize: 16 }}/>
                                    </Tooltip>
                                  </InputAdornment>
                              }}/>
                          </Grid>
                          <Grid item xs={12}><Typography align='center' color="textSecondary" variant="headline" component="h2" style={{color:'#E91E63'}}>Advisors</Typography></Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField fullWidth required error={this.state.advisorsAbove30Below80Error} disabled={this.state.loading}
                              id="advisorsAbove30Below80" label="30 endorsements" value={this.state.advisorsAbove30Below80}
                              onChange={this.handleChange('advisorsAbove30Below80')} margin="normal" type={'number'}
                              helperText="Number of advisors with more than 30 but less than 80 endorsements"
                              InputProps={{
                                endAdornment:
                                  <InputAdornment position="end">
                                    <Tooltip
                                      id="tooltip"
                                      title="Go to each LinkedIN advisor scroll down to endorsements, and input 1 here for each advisor that has more than 30 but less than 80 endorsements"
                                      placement="top"
                                    >
                                      <HelpIcon color="disabled" style={{ fontSize: 16 }}/>
                                    </Tooltip>
                                  </InputAdornment>
                              }}/>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField fullWidth required error={this.state.advisorsAbove80Error} disabled={this.state.loading}
                              id="advisorsAbove80" label="80 endorsements" value={this.state.advisorsAbove80}
                              onChange={this.handleChange('advisorsAbove80')} margin="normal" type={'number'}
                              helperText="Number of advisors with more than 80 endorsements"
                              InputProps={{
                                endAdornment:
                                  <InputAdornment position="end">
                                    <Tooltip
                                      id="tooltip"
                                      title="Go to each LinkedIN advisor scroll down to endorsements, and input 1 here for each advisor that has more than 80 endorsements"
                                      placement="top"
                                    >
                                      <HelpIcon color="disabled" style={{ fontSize: 16 }}/>
                                    </Tooltip>
                                  </InputAdornment>
                              }}/>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField fullWidth required error={this.state.advisors3recommendationsError} disabled={this.state.loading}
                              id="advisors3recommendations" label="3 recommends" value={this.state.advisors3recommendations}
                              onChange={this.handleChange('advisors3recommendations')} margin="normal" type={'number'}
                              helperText="Number of advisors with more than 3 recommendations"
                              InputProps={{
                                endAdornment:
                                  <InputAdornment position="end">
                                    <Tooltip
                                      id="tooltip"
                                      title="Go to each LinkedIN advisor scroll down to recommendations, and input 1 here for each advisor that has more than 3 but less than 5 recommendations"
                                      placement="top"
                                    >
                                      <HelpIcon color="disabled" style={{ fontSize: 16 }}/>
                                    </Tooltip>
                                  </InputAdornment>
                              }}/>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField fullWidth required error={this.state.advisors5recommendationsError} disabled={this.state.loading}
                              id="advisors5recommendations" label="5 recommends" value={this.state.advisors5recommendations}
                              onChange={this.handleChange('advisors5recommendations')} margin="normal" type={'number'}
                              helperText="Number of advisors with more than 5 recommendations"
                              InputProps={{
                                endAdornment:
                                  <InputAdornment position="end">
                                    <Tooltip
                                      id="tooltip"
                                      title="Go to each LinkedIN advisor scroll down to recommendations, and input 1 here for each advisor that has more than 5 recommendations"
                                      placement="top"
                                    >
                                      <HelpIcon color="disabled" style={{ fontSize: 16 }}/>
                                    </Tooltip>
                                  </InputAdornment>
                              }}/>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} lg={4}>
                        <Grid container xs={12} direction="row" alignItems="flex-start">
                          <Grid item xs={12}><Typography align='center' color="textSecondary" variant="headline" component="h2" style={{color:'#E91E63'}}>Token</Typography></Grid>
                          <Grid item style={style} xs={12}>
                            <FormControl fullWidth={true} disabled={this.state.loading}>
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
                            <FormControl fullWidth={true} disabled={this.state.loading}>
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
                            <TextField required fullWidth={true} error={this.state.tokenTotalError} disabled={this.state.loading}
                              id="tokenTotal" label="Token Total" value={this.state.tokenTotal}
                              onChange={this.handleChange('tokenTotal')} margin="normal"
                              InputProps={{inputComponent: NumberFormatCustom,}}
                              helperText="Total amount of tokens created"/>
                          </Grid>
                          <Grid item xs={6}>
                            <TextField required fullWidth={true} error={this.state.tokenSupplyError} disabled={this.state.loading}
                              id="tokenSupply" label="Token Supply" value={this.state.tokenSupply}
                              onChange={this.handleChange('tokenSupply')} margin="normal"
                              InputProps={{inputComponent: NumberFormatCustom,}}
                              helperText="Tokens made available for sale"/>
                          </Grid>
                          <Grid item xs={6}>
                            <TextField required fullWidth={true} error={this.state.tokenPriceError} disabled={this.state.loading}
                              id="tokenPrice" label="Token Price" value={this.state.tokenPrice}
                              onChange={this.handleChange('tokenPrice')} margin="normal"
                              InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                inputComponent: NumberFormatCustom
                              }}
                              helperText="Current price in USD of the token"/>
                          </Grid>
                          <Grid item xs={6}>
                            <TextField required fullWidth={true} error={this.state.tokenMarketCapError} disabled={this.state.loading}
                              id="tokenMarketCap" label="Marketcap" value={this.state.tokenMarketCap}
                              onChange={this.handleChange('tokenMarketCap')} margin="normal"
                              InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                inputComponent: NumberFormatCustom
                              }}
                              helperText="Total current marketcap or amount of funds raised"/>
                          </Grid>
                          <Grid item style={style} xs={12} sm={6}>
                            <TextField required type={'number'} fullWidth={true} error={this.state.tokenAvailableSaleError} disabled={this.state.loading}
                              id="tokenAvailableSale" label="Available for sale" value={this.state.tokenAvailableSale}
                              onChange={this.handleChange('tokenAvailableSale')} margin="normal"
                              InputProps={{
                                endAdornment: <InputAdornment position="end">%</InputAdornment>
                              }}
                              helperText="Percentage of tokens available for public and private purchase"/>
                          </Grid>
                          <Grid item style={style} xs={12} sm={6}>
                            <TextField required type={'number'} fullWidth={true} error={this.state.tokenPresaleBonusError} disabled={this.state.loading}
                              id="tokenPresaleBonus" label="Max Presale Bonus" value={this.state.tokenPresaleBonus}
                              onChange={this.handleChange('tokenPresaleBonus')} margin="normal"
                              InputProps={{
                                endAdornment: <InputAdornment position="start">%</InputAdornment>
                              }}
                              helperText="The maximum presale bonus for early investors"/>
                          </Grid>
                          <Grid item xs={12}><Typography align='center' color="textSecondary" variant="headline" component="h2" style={{color:'#E91E63'}}>Idea</Typography></Grid>
                          <Grid item xs={12} sm={6}>
                            <FormControl fullWidth={true} error={this.state.ideaSectorDisruptionError} required disabled={this.state.loading}>
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
                          <Grid item xs={12} sm={6}>
                            <FormControl fullWidth={true} error={this.state.ideaAdoptionPotentialError} required disabled={this.state.loading}>
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
                          <Grid item xs={12} sm={6}>
                            <FormControl fullWidth={true} error={this.state.ideaMarketSasturationError} required disabled={this.state.loading}>
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
                          <Grid item xs={12} sm={6}>
                            <FormControl fullWidth={true} error={this.state.ideaCompetitorsError} required disabled={this.state.loading}>
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
                          <Grid item xs={12} sm={6}>
                            <FormControl fullWidth={true} error={this.state.ideaInnovationError} required disabled={this.state.loading}>
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
                  <Grid container xs={12} direction="row" justify="flex-end" spacing={16}>
                    {this.state.loading && <CircularProgress size={36} />}
                    <Button size="large" variant="raised" color="secondary" disabled={this.state.loading} onClick={this.submit}>
                      Upload
                    </Button>
                    {this.state.error && <Button size="large" style={{marginLeft:'10px'}} variant="raised" color="secondary" disabled={this.state.loading} onClick={this.force}>
                      Proceed With Errors
                    </Button>}
                  </Grid>
                  <Grid container xs={12} direction="row">
                    <LinearProgress />
                  </Grid>
                </CardContent>
              </Card>:
              !this.state.errored?<Card raised elevation={10} square={false} fullWidth={true}>
                <CardContent>
                  <Grid container xs={12} direction="row" justify="center">
                  <Grid item xs={12}>
                    <Typography align='center' color="textSecondary" variant="headline" component="h2">Results</Typography>
                  </Grid>
                    <Grid item xs={6}>
                      <Typography align='right' color="textSecondary" component="h2">Crypto Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align='left' color="textSecondary" component="h2" style={{color:'#E91E63'}}>{this.state.r.cryptoName}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align='right' color="textSecondary" component="h2">Crypto Symbol&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align='left' color="textSecondary" component="h2" style={{color:'#E91E63'}}>{this.state.r.cryptoSymbol}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align='right' color="textSecondary" component="h2">Rating&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align='left' color="textSecondary" component="h2" style={{color:'#E91E63'}}>{this.state.r.metric.scorePercentage}%</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align='right' color="textSecondary" component="h2">Rating with Product&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align='left' color="textSecondary" component="h2" style={{color:'#E91E63'}}>{this.state.r.metric.scorePercentageMVP}%</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align='right' color="textSecondary" component="h2">Max possible rating&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align='left' color="textSecondary" component="h2" style={{color:'#E91E63'}}>{this.state.r.metric.scorePercentageMax}%</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={this.reset}>Back</Button>
                </CardActions>
              </Card>:
              <Card raised elevation={10} square={false} fullWidth={true}>
                <CardContent>
                  <Grid container xs={12} direction="row" justify="center">
                  <Grid item xs={12}>
                    <Typography align='center' color="textSecondary" variant="headline" component="h2">Error Encountered</Typography>
                  </Grid>
                    <Grid item xs={12}>
                      <Typography align='center' color="textSecondary" component="h2" style={{margin:100,color:'#E91E63'}}>{this.state.err.toString()}</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={this.reset}>Back</Button>
                </CardActions>
              </Card>}
            </Grid>
            <Grid item xs={12}><Typography align='center'>Copyright Andre Cronje 2018</Typography></Grid>
          </Grid>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
