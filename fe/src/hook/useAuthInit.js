import { useContext } from "react";
import { RoleContext } from "../context/roleName";

const useAuthInit = () => useContext(RoleContext);

export default useAuthInit;