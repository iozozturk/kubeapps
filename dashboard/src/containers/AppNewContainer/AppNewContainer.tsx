import { connect } from "react-redux";
import { push } from "react-router-redux";
import { Dispatch } from "redux";

import actions from "../../actions";
import DeploymentForm from "../../components/DeploymentForm";
import { IChartVersion, IStoreState } from "../../shared/types";

interface IRouteProps {
  match: {
    params: {
      repo: string;
      id: string;
      version: string;
    };
  };
}

function mapStateToProps(
  { apps, catalog, charts }: IStoreState,
  { match: { params } }: IRouteProps,
) {
  return {
    bindings: catalog.bindings,
    chartID: `${params.repo}/${params.id}`,
    chartVersion: params.version,
    selected: charts.selected,
  };
}

function mapDispatchToProps(dispatch: Dispatch<IStoreState>) {
  return {
    deployChart: (
      version: IChartVersion,
      releaseName: string,
      namespace: string,
      values?: string,
    ) => dispatch(actions.charts.deployChart(version, releaseName, namespace, values)),
    fetchChartVersions: (id: string) => dispatch(actions.charts.fetchChartVersions(id)),
    getBindings: () => dispatch(actions.catalog.getBindings()),
    getChartValues: (id: string, version: string) =>
      dispatch(actions.charts.getChartValues(id, version)),
    getChartVersion: (id: string, version: string) =>
      dispatch(actions.charts.getChartVersion(id, version)),
    push: (location: string) => dispatch(push(location)),
    selectChartVersionAndGetFiles: (version: IChartVersion) =>
      dispatch(actions.charts.selectChartVersionAndGetFiles(version)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DeploymentForm);
