#pip install paramiko ntplib
import paramiko
import ntplib
from time import ctime
import datetime

# SSH 접속 정보
hostname = '192.168.230.133'
username = 'qwer'
password = '1234'

# 결과를 저장할 파일 열기
with open('result.txt', 'w') as result_file:

    # SSH 클라이언트 설정
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

    try:
        # 서버에 연결
        client.connect(hostname, username=username, password=password)

        # 1. admin 또는 administrator 계정 확인
        stdin, stdout, stderr = client.exec_command('cat /etc/passwd | egrep "admin:|administrator:"')
        admin_accounts = stdout.read().decode()
        result_file.write('1. Admin/Administrator Accounts Check:\n')
        result_file.write(admin_accounts if admin_accounts else "No admin/administrator accounts found\n")

        # 2. 세션 타임아웃 체크
        stdin, stdout, stderr = client.exec_command('echo $TMOUT')
        session_timeout = stdout.read().decode()
        result_file.write('2. Session Timeout Check:\n')
        result_file.write(f"Session timeout: {session_timeout.strip()} (less than 300 or not set)\n" if not session_timeout.strip() or int(session_timeout) < 300 else f"Session timeout is {session_timeout.strip()} seconds\n")

        # 3. 비밀번호 정책 설정값 확인
        stdin, stdout, stderr = client.exec_command('cat /etc/login.defs | egrep "PASS_MIN_DAYS|PASS_MAX_DAYS|PASS_MIN_LEN" | egrep -v "#"')
        password_policy = stdout.read().decode()
        result_file.write('3. Password Policy Check:\n')
        result_file.write(password_policy + '\n')

        # 4. 시간 동기화 확인 (Google NTP 시간 비교)
        ntp_client = ntplib.NTPClient()
        ntp_server = 'time.google.com'
        response = ntp_client.request(ntp_server, version=3)
        google_time = ctime(response.tx_time)
        stdin, stdout, stderr = client.exec_command('date +"%Y-%m-%d %H:%M:%S"')
        server_time_str = stdout.read().decode().strip()
        server_time = datetime.datetime.strptime(server_time_str, "%Y-%m-%d %H:%M:%S")
        google_time_dt = datetime.datetime.strptime(google_time, "%a %b %d %H:%M:%S %Y")
        time_diff = abs((google_time_dt - server_time).total_seconds())
        result_file.write('4. Time Synchronization Check:\n')
        result_file.write(f"Server time: {server_time_str}, Google time: {google_time}\n")
        result_file.write(f"Time difference: {time_diff} seconds\n")
        if time_diff > 30:
            result_file.write("Time difference is more than 30 seconds.\n")
        else:
            result_file.write("Time is synchronized within 30 seconds.\n")

        # 5. 백신 설치 여부 확인
        stdin, stdout, stderr = client.exec_command('find / -name "v3net"')
        antivirus_check = stdout.read().decode()
        result_file.write('5. Antivirus Installation Check:\n')
        result_file.write("Antivirus installed\n" if antivirus_check else "No antivirus installed\n")

    except Exception as e:
        result_file.write(f"Error: {e}\n")
    finally:
        # 연결 종료
        client.close()