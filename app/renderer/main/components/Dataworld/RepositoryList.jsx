import React, { PropTypes, Component } from 'react';
import VirtualizedSelect from 'react-virtualized-select';

class RepositoryList extends Component {
  static propTypes = {
    requestGetDataworldRepos: PropTypes.func.isRequired,
    trackDataworldRepo: PropTypes.func.isRequired,
    dataworld: PropTypes.object.isRequired,
  }

  componentDidMount() {
    this.props.requestGetDataworldRepos(this.props.dataworld.accessToken);
  }

  render() {
    const untrackedRepos = this.props.dataworld.repos
      .filter(repo => !repo.tracked)
      .map(({ id, fullName }) => ({
        value: id,
        label: fullName,
      }));

    return (
      <div>
        <h3>Repos</h3>
        <VirtualizedSelect
          name="repos"
          options=""
          onChange={({ value }) => this.props.trackDataworldRepo(value)}
        />
      </div>
    );
  }
}

export default RepositoryList;
