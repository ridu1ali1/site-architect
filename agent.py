import pandas as pd
from scouter import scout_bhubaneswar
from builder import create_mockup
import os

def run_daily_agent():
    print("[>] Site Architect Agent: Starting Daily Job...")
    
    # 1. Scout
    new_leads = scout_bhubaneswar()
    
    if not new_leads:
        print("[!] No new leads found today.")
        return
        
    final_data = []
    
    # 2. Architect (Build Sites)
    for lead in new_leads:
        name = lead["Business Name"]
        live_link = create_mockup(name)
        
        if live_link:
            lead["Mockup Link"] = live_link
            final_data.append(lead)
            
    # 3. Report (Excel)
    if final_data:
        df = pd.DataFrame(final_data)
        file_name = "Site_Architect_Leads.xlsx"
        
        # Append if exists
        if os.path.exists(file_name):
            existing_df = pd.read_excel(file_name)
            df = pd.concat([existing_df, df], ignore_index=True).drop_duplicates(subset=["Business Name"])
            
        df.to_excel(file_name, index=False)
        print(f"[#] Leads saved to {file_name}")
        
        # 4. Update Private Dashboard Data (Hidden JSON)
        # We use a secret name so people cannot easily find your data
        secret_file = "leads_vault_Sabnuryasmin12@.json"
        df.to_json(secret_file, orient="records")
        print(f"[*] Private vault updated: {secret_file}")
        
        # Also upload the secret file to GitHub
        from builder import upload_to_github
        upload_to_github(secret_file, secret_file, "Updating private vault")
        
    print("[!] Agent job finished successfully!")

if __name__ == "__main__":
    run_daily_agent()
