@echo off
echo ========================================
echo   MongoDB Installation Checker
echo ========================================
echo.

REM Check if MongoDB is installed
where mongosh >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [OK] MongoDB is installed!
    echo.
    
    REM Get MongoDB version
    echo Checking MongoDB version...
    mongosh --version
    echo.
    
    REM Check if MongoDB service is running
    echo Checking MongoDB service status...
    sc query MongoDB | find "RUNNING" >nul
    if %ERRORLEVEL% EQU 0 (
        echo [OK] MongoDB service is RUNNING
    ) else (
        echo [WARNING] MongoDB service is NOT RUNNING
        echo.
        echo To start MongoDB, run:
        echo   net start MongoDB
        echo.
    )
    
    echo.
    echo Testing connection to local MongoDB...
    echo use iot-web-db; db.blogposts.countDocuments() | mongosh --quiet
    echo.
    echo [OK] MongoDB connection successful!
    echo.
    echo ========================================
    echo   MongoDB is ready to use!
    echo ========================================
) else (
    echo [ERROR] MongoDB is NOT installed!
    echo.
    echo Please install MongoDB using one of these options:
    echo.
    echo Option 1: Install Locally
    echo   1. Download from: https://www.mongodb.com/try/download/community
    echo   2. Run the MSI installer
    echo   3. Choose "Complete" installation
    echo   4. Install as Windows Service
    echo.
    echo Option 2: Use MongoDB Atlas (Cloud)
    echo   1. Go to: https://www.mongodb.com/cloud/atlas/register
    echo   2. Create free account
    echo   3. Create cluster
    echo   4. Get connection string
    echo   5. Update MONGODB_URI in .env file
    echo.
    echo For detailed instructions, see:
    echo   Server\MONGODB_SETUP.md
    echo.
)

pause
