import { ModuleInterface } from '../../types/Module.interface';
/**
 * Gets a wrapped native module instance for the provided module.
 * Will attempt to create a new instance if non previously created.
 *
 * @param module
 * @returns {*}
 */
export declare function getNativeModule(module: ModuleInterface): unknown;
/**
 * Custom wrapped app module as it does not have it's own FirebaseModule based class.
 *
 * @returns {*}
 */
export declare function getAppModule(): unknown;
