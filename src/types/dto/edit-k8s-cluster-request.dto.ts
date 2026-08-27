import { K8sOidcProvider } from "./create-k8s-cluster-request.dto";

export type EditK8sClusterRequestDto = {
  name?: string;
  description?: string;
  oidc_provider?: K8sOidcProvider;
};
