import json
import datetime
import urllib.request

PLUGIN_STATS_URL = 'https://data.octoprint.org/export/plugin_stats_30d.json'

class DataUpdater:
    def __init__(self, config_path, stats_path, repo_path):
        with open(config_path, "rt") as config_file:
            self.config = json.load(config_file)
        self.stats_path = stats_path
        self.repo_path = repo_path
        
    def update_stats(self):
        print("Updating plugin stats:")
        resp = urllib.request.urlopen(PLUGIN_STATS_URL, None)
        if resp.status != 200:
            print("Couldn't get plugin_stats_30d.json")
            return
        
        plugin_stats = json.load(resp)
        with open(self.stats_path, "rt") as stats_file:
            stats = json.load(stats_file)
        
        dt = datetime.datetime.strptime(plugin_stats['_generated'],'%Y-%m-%dT%H:%M:%S%z').date()
        for plugin in self.config['plugins']:
            pid = plugin['id']
            print(f"  Plugin: {pid}")
            stats30 = plugin_stats['plugins'][pid]

            if pid not in stats:
                stats[pid] = {'history': []}

            stats[pid]['total'] = stats30['instances']
            stats[pid]['versions'] = stats30['versions']

            # remove the current date if it exists
            stats[pid]['history'] = [x for x in stats[pid]['history'] if x['date']!=dt.strftime('%Y-%m-%d')]
            # remove old history
            stats[pid]['history'] = [x for x in stats[pid]['history'] if (datetime.datetime.now()-datetime.datetime.strptime(x['date'], '%Y-%m-%d')).days <= 30]
            stats[pid]['history'].append({
                'date': dt.strftime('%Y-%m-%d'),
                'total': stats30['instances'],
                'versions': stats30['versions']
            })
        
        with open(self.stats_path, 'wt') as stats_file:
            json.dump(stats, stats_file)
        
        print("Plugin stats updated.")

    def update_repos(self):
        print("Updating plugin repo stats:")

        with open(self.repo_path,'rt') as repos_file:
            repos = json.load(repos_file)

        for plugin in self.config['plugins']:
            print (f"  plugin {plugin['name']}")

            if plugin['id'] not in repos:
                repos[plugin['id']] = {}

            repo_resp = urllib.request.urlopen(f"https://api.github.com/repos/{self.config['gitHubUser']}/{plugin['repo']}", None)
            open_frs_resp = urllib.request.urlopen(f"https://api.github.com/repos/{self.config['gitHubUser']}/{plugin['repo']}/issues?state=open&labels=enhancement", None)
            conf_bugs_resp = urllib.request.urlopen(f"https://api.github.com/repos/{self.config['gitHubUser']}/{plugin['repo']}/issues?state=open&labels=bug,confirmed", None)
            need_info_resp = urllib.request.urlopen(f"https://api.github.com/repos/{self.config['gitHubUser']}/{plugin['repo']}/issues?state=open&labels=need+more+info", None)
                
            repo_stats = json.load(repo_resp)
            open_frs = json.load(open_frs_resp)
            conf_bugs = json.load(conf_bugs_resp)
            need_info = json.load(need_info_resp)
            
            repos[plugin['id']]['stargazers'] = repo_stats['stargazers_count']
            repos[plugin['id']]['forks'] = repo_stats['forks_count']
            repos[plugin['id']]['open_issues'] = repo_stats['open_issues_count']
            repos[plugin['id']]['open_frs'] = len(open_frs)
            repos[plugin['id']]['open_need_info'] = len(need_info)
            repos[plugin['id']]['conf_bugs'] = len(conf_bugs)

        with open(self.repo_path, 'wt') as repos_file:
            json.dump(repos, repos_file)
        print("Plugin repo stats updated.")
            

if __name__=='__main__':
    config = 'plugins-dashboard-config.json'
    stats = 'data/stats.json'
    repo_stats = 'data/repos.json'
    updater = DataUpdater(config, stats, repo_stats)
    updater.update_stats()
    updater.update_repos()