# 01. Definition of Actions

다수의 Redux Action을 콜하여 State에 Set하는 경우나 백엔드에게 Request하여 받은 데이터를 Redux에 Set하는 경우와 같이 Redux State에 데이터를 Set하기 위해 여러개의 처리가 필요한 경우에 이를 하나의 함수로 정의한것들을 모은것을 Actions로 정의한다.


# 02. Type of Actions

### 1. WorkspaceActions
Workspace 관련 데이터들을 제어하는 Actions. 이는 세부적으로 한번 더 구분된다.
* 1-1 index(workspaceActions) : workspace와 관련된 일반적인 데이터들을 관리한다.
* 1-2 fileActions : workspace 내에 포함된 File 및 Folder와 관련된 데이터들을 관리한다.
* 1-3 messageActions : workspace 내에 포함된 message와 관련된 데이터들을 관리한다.
### 2. UserActions
로그인과 같이 접속해서 사용중인 하나의 특정 유저와 관련된 데이터들을 제어하는 Actions

# 03. Use of Actions
```
import workspaceActions, { messageActions, fileActions } from '~/providers/WorkspaceActions/index'
import userActions from '~/providers/UserActions'

workspaceActions.openWorkspace(1)
fileActions.openShareFile('foo.pdf')
...
```

# 04. Dos

## 1. WorkspaceActions

### 1) getWorkspace
* Description : Workspace 전반의 데이터를 서버로부터 가져온다.
* Arguments

| name | type | required |description |
|:---:|:---:|:---:|:---:|
| userId | number | true | 로그인된 User의 PK |
| accountId | string | true | 로그인된 User의 ID (Email 주소) |
| workspaceId | number | true | 가져오려는 Workspace의 PK |
| cb | func | true | 데이터가 Redux에 set된후 콜되는 콜백함수 |

### 2) updateWorkspaceStatus
* Description : 공유된 워크스페이스의 실시간상태 데이터를 업데이트한다.
* Arguments

| name | type | required | description |
|:---:|:---:|:---:|:---:|
| workspaceStatus | WorkspaceStatus | true | Workspace내에 현재 접속중인 유저, 채팅중인 유저데이터 |
| cb | func | true | 데이터가 Redux에 set된후 콜되는 콜백함수 |

### 3) setTypingUser
* Description : 서버에 현재 채팅중인 유저 데이터를 업데이트하고 이를 Workspace 멤버에게 공유한다.
* Arguments

| name | type | required | description |
|:---:|:---:|:---:|:---:|
| workspaceId | number | true | 로그인중인 유저가 현재 접속중인 workspace의 PK |
| accountId | string | true | 로그인중인 유저의 ID (Email) |
| isDelete | boolean | true | 채팅중인 유저에 추가되는 것인지, 혹은 채팅중이던 유저에서 빠지는 것인지의 데이터. |

### 4) openWorkspace
* Description : 해당 워크스페이스로 접속하고, 이 사실을 기존 워크스페이스 멤버 및 새로 접속하는 워크스페이스 멤버에게 공유한다.
* Arguments

| name | type | required |description |
|:---:|:---:|:---:|:---:|
| workspaceId | number | true | 로그인중인 유저가 현재 접속중인 workspace의 PK |
| openFile | string | false | 워크스페이스와 함께 Open할 FileId |

### 5) focusSnapshot
* Description : 해당 스냅샷으로 Focus 한다.
* Arguments

| name | type | required |description |
|:---:|:---:|:---:|:---:|
| snapMessage | SnapshotMessage | true | focus할 스냅샷 메세지 |

## 1-2. FileActions

### 1) openShareFile
* Description : 공유된 파일을 연다.
* Arguments

| name | type | required |description |
|:---:|:---:|:---:|:---:|
| fileId | string | true | 열 파일의 fileId |

### 2) closeCurrentOpenedFile
* Description : 현재 열려있는 파일을 닫는다.
* Arguments : void

### 3) downloadFile
* Description : 해당 파일을 CacheStorage에 다운받는다.
* Arguments

| name | type | required |description |
|:---:|:---:|:---:|:---:|
| workspaceId | number | true | 해당 파일이 포함된 workspace의 PK |
| fileId | string | true | 다운받을 파일의 fileId |
| cb | func | true | 처리된 후 콜되는 콜백함수 |

### 4) downloadFileAndOpen
* Description : 해당 파일을 CacheStorage에 다운받고, 동시에 연다.
* Arguments

| name | type | required |description |
|:---:|:---:|:---:|:---:|
| workspaceId | number | true | 해당 파일이 포함된 workspace의 PK |
| fileId | string | true | 다운받을 파일의 fileId |
| cb | func | true | 처리된 후 콜되는 콜백함수 |

### 5) uploadFile
* Description : 파일을 업로드하고, 해당 파일을 CacheStorage에 복사한후, 이를 Workspace 멤버에게 공유한다.
* Arguments

| name | type | required |description |
|:---:|:---:|:---:|:---:|
| fileId | string | true | 업로드할 파일의 fileId |
| workspaceId | number | true | 파일을 업로드할 Workspace의 PK |
| loginUser | User | true | 파일 업로더 |
| fileSize | number | true | 업로드할 파일의 용량 |
| filePath | string | true | 업로드할 파일의 위치 |
| parentFolderId | number | true | 업로드할 파일이 들어갈 폴더의 PK |
| folders | string[] | true | 업로드할 폴더의 구조 (/foo/aa/foo.pdf) => ['foo', 'aa'] |

### 6) uploadFileInWeb
* Description : 파일을 업로드하고, 이를 Workspace 멤버에게 공유한다.
* Arguments

| name | type | required |description |
|:---:|:---:|:---:|:---:|
| fileId | string | true | 업로드할 파일의 fileId |
| workspaceId | number | true | 파일을 업로드할 Workspace의 PK |
| loginUser | User | true | 파일 업로더 |
| fileSize | number | true | 업로드할 파일의 용량 |
| file | any | true | FormData에 append될 File Data |
| parentFolderId | number | true | 업로드할 파일이 들어갈 폴더의 PK |
| folders | string[] | true | 업로드할 폴더의 구조 (/foo/aa/foo.pdf) => ['foo', 'aa'] |
| cb | func | true | 처리된 후 콜되는 콜백함수 |

### 7) createFolder
* Description : 폴더를 생성하고, 이를 Workspace 멤버에게 공유한다.
* Arguments

| name | type | required |description |
|:---:|:---:|:---:|:---:|
| workspaceId | number | true | 폴더를 생성할 Workspace의 PK |
| parentId | number | true | 폴더를 생성할 부모 폴더의 PK |
| userId | number | true | 폴더를 생성하는 User의 PK |
| folderName | string | true | 폴더의 이름 |
| cb | func | true | 처리된 후 콜되는 콜백함수 |

### 8) throwFilesAndFolders
* Description : 파일 또는 폴더를 휴지통에 버린다.
* Arguments

| name | type | required |description |
|:---:|:---:|:---:|:---:|
| fileIds | number[] | true | 휴지통에 버릴 파일들의 PK |
| folderIds | number[] | true | 휴지통에 버릴 폴더들의 PK |
| parentFolderId | number | true | 휴지통의 버릴 파일 또는 폴더의 현재 부모폴더의 PK |
| userId | number | true | 해당 명령을 실행하는 User의 PK |
| workspaceId | number | true | 해당 명령이 실행되는 Workspace의 PK |
| cb | func | true | 처리된 후 콜되는 콜백함수 |

### 9) moveFilesAndFolders
* Description : 파일 또는 폴더를 특정 위치의 폴더로 옮긴다.
* Arguments

| name | type | required |description |
|:---:|:---:|:---:|:---:|
| fileIds | number[] | true | 휴지통에 버릴 파일들의 PK |
| folderIds | number[] | true | 옮길 폴더들의 PK |
| destinationFolderId | number | true | 파일 또는 폴더를 옮길 위치 폴더의 PK |
| parentFolderId | number | true | 휴지통의 버릴 파일 또는 폴더의 현재 부모폴더의 PK |
| workspaceId | number | true | 해당 명령이 실행되는 Workspace의 PK |
| userId | number | true | 해당 명령을 실행하는 User의 PK |
| cb | func | true | 처리된 후 콜되는 콜백함수 |

### 10) copyFilesAndFolders
* Description : 파일 또는 폴더를 특정 위치로 복사한다.
* Arguments

| name | type | required |description |
|:---:|:---:|:---:|:---:|
| fileIds | number[] | true | 복사할 파일들의 PK |
| folderIds | number[] | true | 복사할 폴더들의 PK |
| destinationFolderId | number | true | 파일 또는 폴더를 복사할 위치 폴더의 PK |
| workspaceId | number | true | 해당 명령이 실행되는 Workspace의 PK |
| userId | number | true | 해당 명령을 실행하는 User의 PK |
| cb | func | true | 처리된 후 콜되는 콜백함수 |

### 11) deleteFilesAndFolders
* Description : 휴지통에 버려져 있는 폴더 및 파일들을 완전히 삭제한다.
* Arguments

| name | type | required |description |
|:---:|:---:|:---:|:---:|
| fileIds | number[] | true | 삭제할 파일들의 PK |
| folderIds | number[] | true | 삭제할 폴더들의 PK |
| workspaceId | number | true | 해당 명령이 실행되는 Workspace의 PK |
| userId | number | true | 해당 명령을 실행하는 User의 PK |
| cb | func | true | 처리된 후 콜되는 콜백함수 |

### 12) downloadFilesAndFolders
* Description : 폴더 및 파일들을 압축하여 한번에 다운로드 받는다.
* Arguments

| name | type | required |description |
|:---:|:---:|:---:|:---:|
| workspaceId | number | true | 접속중인 workspace PK |
| files | File[](in Redux) | true | 다운 받을 File들|
| folders | Folder[] | true | 다운받을 폴더들 |
| downloadName | string | true | 파일을 저장할 이름. 압축파일 이므로 .zip 으로 끝나야 한다. |

### 13) renameFile
* Description : 파일의 이름을 바꾼다.
* Arguments

| name | type | required |description |
|:---:|:---:|:---:|:---:|
| fileId | string | true | 이름을 바꿀 파일의 fileId (no pk) |
| newFileName | string | true | 파일의 새로운 이름 |
| cb | func | true | 처리된 후 콜되는 콜백함수 |

### 14) renameFolder
* Description : 폴더의 이름을 바꾼다.
* Arguments

| name | type | required |description |
|:---:|:---:|:---:|:---:|
| folderId | number | true | 이름을 바꿀 폴더의 PK |
| newFolderName | string | true | 폴더의 새로운 이름 |
| cb | func | true | 처리된 후 콜되는 콜백함수 |

### 15) renameWorkspace
* Description : 워크스페이스의 이름을 바꾼다.
* Arguments

| name | type | required |description |
|:---:|:---:|:---:|:---:|
| workspaceId | number | true | 이름을 바꿀 Workspace의 PK |
| newWorkspaceName | string | true | Workspace의 새로운 이름 |
| cb | func | true | 처리된 후 콜되는 콜백함수 |

## 1-3. MessageActions

### 1) getMessages
* Description : 이전의 메시지들을 가져온다.
* Arguments

| name | type | required |description |
|:---:|:---:|:---:|:---:|
| workspaceId | number | true | 메시지를 가져올 Workspace의 PK |

### 2) createMessage
* Description : 새로운 메시지를 생성하고, 이를 해당 Workspace 멤버들에게 공유한다.
* Arguments

| name | type | required |description |
|:---:|:---:|:---:|:---:|
| user_id | number | true | 메시지를 보내는 유저의 PK |
| message | string | true | 보낼 메시지 |
| workspace | Workspace | true | 메시지를 보내는 Workspace |
| snapshot | SnapshotInput | false | 메시지에 포함된 스냅샷 |
| image | string | false | 메시지에 포함된 이미지 |

### 3) resendMessage
* Description : 전송에 실패한 메시지를 다시 전송 시도한다.
* Arguments

| name | type | required |description |
|:---:|:---:|:---:|:---:|
| user_id | number | true | 메시지를 보내는 유저의 PK |
| createdAt | string | true | 전송 실패한 메시지를 보낸 시간(YYYYMMDDHHmmSS) |
| message | string | true | 보낼 메시지 |
| workspace | Workspace | true | 메시지를 보내는 Workspace |
| snapshot | SnapshotInput | false | 메시지에 포함된 스냅샷 |
| image | string | false | 메시지에 포함된 이미지 |

## 2. UserActions

### 1) signUpRequest
* Description : 회원가입을 요청한다.
* Arguments

| name | type | required |description |
|:---:|:---:|:---:|:---:|
| accountId | string | true | 회원가입할 유저의 AccountId (Email)|
| password | string | true | 회원가입할 유저의 비밀번호 |
| fullname | string | true | 회원가입할 유저의 FullName |
| cb | func | true | 처리된 후 콜되는 콜백함수 |

### 2) signInRequest
* Description : 로그인을 요청한다.
* Arguments

| name | type | required |description |
|:---:|:---:|:---:|:---:|
| accountId | string | true | 회원가입할 유저의 AccountId (Email)|
| password | string | true | 회원가입할 유저의 비밀번호 |
| cb | func | true | 처리된 후 콜되는 콜백함수 |

### 3) confirmToken
* Description : Local에 저장된 암호화된 토큰을 이용해 자동로그인을 요청한다.
* Arguments

| name | type | required |description |
|:---:|:---:|:---:|:---:|
| token | string | true | 로그인 되었던 유저의 인증토큰 |

### 4) signOut
* Description : Logout하고 Redux를 초기화한다.
* Arguments : void

### 5) createWorkspace
* Description : 새로운 Workspace를 생성하고, 생성된 워크스페이스로 접속한다.
* Arguments

| name | type | required |description |
|:---:|:---:|:---:|:---:|
| user | User | true | 워크스페이스를 생성하는 유저 |
| title | string | true | 생성할 워크스페이스의 이름 |

### 6) pushUploadProcess
* Description : 새로운 파일을 업로드하여, 해당 업로드의 프로세스를 추가한다.
* Arguments

| name | type | required |description |
|:---:|:---:|:---:|:---:|
| uploadStatus | UploadStatus | true | upload 상태 데이터 |

### 7) updateUploadProcess
* Description : 업로드 중인 파일의 프로세스 상태를 업데이트한다.
* Arguments

| name | type | required |description |
|:---:|:---:|:---:|:---:|
| uploadStatus | UploadStatus | true | upload 상태 데이터 |


### 8) updateFavorite
* Description : 로그인된 유저의 Favorite리스트에 파일을 추가하거나 뺀다.
* Arguments

| name | type | required |description |
|:---:|:---:|:---:|:---:|
| fileId | number | true | Favorite에서 추가하거나 제거할 파일의 PK |
