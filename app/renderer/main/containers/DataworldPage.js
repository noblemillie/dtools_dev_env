import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dataworld from '../components/Dataworld';
import * as GithubActions from '../../../shared/actions/dataworld';

function mapStateToProps({ dataworld, project }) {
  return { dataworld, project };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(DataworldActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Dataworld);
