---
type: task
status: complete
due: 2026-08-07
tags:
  - work
  - al-go
  - devops
created: 2026-08-06T00:00:00
project: "[[al-go-s2s-deployment-auth]]"
title: Set up S2S authentication for Infopro as a test
work-personal: work
---

# Set up S2S Authentication for Infopro as a Test

Set up S2S (Service-to-Service) deployment authentication for Infopro as a test case.

## Notes
- Part of [[al-go-s2s-deployment-auth]]


## Instructions

### Business Central
1. Go to Microsoft Entra Applications
2. Create a new Entra Application
3. Client Id: b2c3cd3a-aa08-4559-b895-b17699d6d1e8
4. Description: BC-S2S-Deployment
5. State: Enabled
	1. When you do this, it will tell you that a user will be created. Click yes
6. Add the following Permission Sets with no company
	1. D365 Automation
	2. EXTEN. MGT. - ADMIN

### Business Central Admin Centre
1. Go to Microsoft Entra Apps
2. Click Authorize Microsoft Entra app
3. Application (Client) Id: b2c3cd3a-aa08-4559-b895-b17699d6d1e8
4. Get an Admin of the Customers Entra environment to Grant Permission to the app.

### Powershell
After the customer's admin has granted permission, you can then do the following. If they have not granted permission, you will get the error: 'The remote server returned an error: (401) Unauthorized. invalid_client'
You need AZ and BCContainerHelper PowerShell modules installed, and be running PowerShell as administrator:

```PowerShell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned
Install-PackageProvider -Name NuGet -Force
Install-Module BcContainerHelper -Force
Install-Module -Name Az -Repository PSGallery -Force
```

Then run the following script, but first change {Customers tenant Id} to the customer's tenant ID and {Customers Name} to the customer's name
``` powershell
$vaultName = "BC-S2S-Deployment"
$clientIDSecretName = "BC-S2S-Deployment-ClientID"
$clientSecretSecretName = "BC-S2S-Deployment-ClientSecret"
$tenantId = "{Customers tenant Id}"
$customerName = "{Customers Name}"

Connect-AzAccount

$clientID = Get-AzKeyVaultSecret -VaultName $vaultName -Name $clientIDSecretName -AsPlainText
$clientSecret = Get-AzKeyVaultSecret -VaultName $vaultName -Name $clientSecretSecretName -AsPlainText

New-BcAuthContext -clientID $clientID -clientSecret $clientSecret -tenantID $tenantID | New-ALGoAuthContext | Set-Clipboard

$secret = Set-AzKeyVaultSecret -VaultName $vaultName -Name "AuthContext-$customerName" -SecretValue $secretvalue
```

The above script will create a secret in the BC-S2S-Deployment Azure KeyVault.

### GitHub
