import { Credential } from "../entities/Credential";
import { ICredential } from "../interfaces/ICredencial";
import { CredentialRepository } from "../repositories/Credential.Repository";

export const createCredentialsService = async (credentialData: ICredential): Promise<Credential> => {

    const newCredential: Credential = CredentialRepository.create(credentialData);

    await CredentialRepository.save(newCredential);
    
    return newCredential;

};

export const checkCredentialsService = async (credentialData: ICredential): Promise<Credential> => {

    const credentials: Credential = await CredentialRepository.findCredentials(credentialData.email, credentialData.password);

    return credentials;
    
};