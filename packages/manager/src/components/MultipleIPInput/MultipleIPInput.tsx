import Close from '@material-ui/icons/Close';
import { update } from 'ramda';
import * as React from 'react';
import AddNewLink from 'src/components/AddNewLink';
import Button from 'src/components/Button';
import { makeStyles, Theme } from 'src/components/core/styles';
import Typography from 'src/components/core/Typography';
import Grid from 'src/components/Grid';
import Notice from 'src/components/Notice';
import TextField from 'src/components/TextField';

const useStyles = makeStyles((theme: Theme) => ({
  addIP: {
    paddingLeft: 0,
    '& span:first-of-type': {
      justifyContent: 'flex-start'
    }
  },
  input: {
    'nth-child(n+2)': {
      marginTop: theme.spacing()
    }
  },
  root: {
    marginTop: theme.spacing()
  },
  button: {
    minWidth: 'auto',
    minHeight: 'auto',
    marginLeft: -theme.spacing(),
    padding: 0,
    '& > span': {
      padding: 2
    },
    '& :hover, & :focus': {
      color: 'white',
      backgroundColor: theme.palette.primary.main
    }
  },
  helperText: {
    marginBottom: theme.spacing()
  }
}));

export interface Props {
  title: string;
  helperText?: string;
  error?: string;
  ips: string[];
  onChange: (ips: string[]) => void;
}

export const MultipleIPInput: React.FC<Props> = props => {
  const { error, onChange, ips, title, helperText } = props;
  const classes = useStyles();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const transferIPs = update(idx, e.target.value, ips);
    onChange(transferIPs);
  };

  const addNewInput = () => {
    onChange([...ips, '']);
  };

  const removeInput = (idx: number) => {
    const _ips = [...ips];
    _ips.splice(idx, 1);
    onChange(_ips);
  };

  if (!ips) {
    return null;
  }

  return (
    <div className={classes.root}>
      <Typography variant="h3">{title}</Typography>
      {helperText && (
        <Typography className={classes.helperText}>{helperText}</Typography>
      )}
      {error && <Notice error text={error} spacingTop={8} />}
      {ips.map((thisIP, idx) => (
        <Grid
          container
          key={`domain-transfer-ip-${idx}`}
          direction="row"
          alignItems="center"
          justify="center"
          data-testid="domain-transfer-input"
        >
          <Grid item xs={11}>
            <TextField
              className={classes.input}
              // Prevent unique ID errors, since TextField sets the input element's ID to the label
              label={`domain-transfer-ip-${idx}`}
              InputProps={{ 'aria-label': `${title} ip-address-${idx}` }}
              value={thisIP}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e, idx)
              }
              hideLabel
            />
          </Grid>
          {/** Don't show the button for the first input since it won't do anything */}
          <Grid item xs={1}>
            {idx > 0 && (
              <Button
                className={classes.button}
                onClick={() => removeInput(idx)}
              >
                <Close data-testid={`delete-ip-${idx}`} />
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
      <AddNewLink
        onClick={addNewInput}
        label="Add IP"
        data-qa-add-domain-transfer-ip-field
        className={classes.addIP}
      />
    </div>
  );
};

export default React.memo(MultipleIPInput);
